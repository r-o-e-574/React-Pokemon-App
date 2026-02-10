import React from 'react';
import { Link } from 'react-router-dom';
import { useSpeech, useVoices } from 'react-text-to-speech';
import { getTypeTheme } from '../../styles/typeTheme';
import { usePokemonViewStyles } from '../../styles/pokemonViewStyles';
import PlayButton from '../ui/PlayButton';
import SpeechOverlay from '../ui/SpeechOverlay';
import professorImage from '../../images/VSScientist_SV.png';
import labImage from '../../images/lab.jpeg';
import type { Pokemon } from '../../types/pokemon';

type PokemonCardProps = {
    pokemon: Pokemon;
    speciesText?: string;
    genus?: string;
    abilityEffects?: Record<string, string>;
    speciesMeta?: {
        eggGroups: string[];
        habitat?: string;
        color?: string;
        shape?: string;
        captureRate?: number;
        baseHappiness?: number;
        hatchCounter?: number;
        varieties: { name: string; is_default: boolean }[];
    };
    evolutionStages?: Array<{ stage: number; entries: { name: string; details: any }[] }>;
    evolutionSprites?: Record<string, string>;
    varietySprites?: Record<string, string>;
    typeMatchups?: { weak: string[]; resist: string[]; immune: string[] };
};

type TtsButtonProps = {
    text: string;
    label?: string;
    className: string;
    voiceURI?: string;
    announceLabel?: string;
    disabled?: boolean;
    onSpeakStart?: (label: string) => void;
    onSpeakStop?: () => void;
};

function TtsButton({
    text,
    label = 'Play',
    className,
    voiceURI,
    announceLabel,
    disabled,
    onSpeakStart,
    onSpeakStop
}: TtsButtonProps) {
    const canSpeak = typeof window !== 'undefined' && 'speechSynthesis' in window;
    const trimmedText = text.trim();
    const spokenBody = trimmedText.endsWith('.') ? trimmedText : `${trimmedText}.`;
    const spokenText = announceLabel ? `${announceLabel}. ${spokenBody}` : spokenBody;
    const { start, stop } = useSpeech({
        text: spokenText,
        rate: 0.9,
        pitch: 0.95,
        volume: 1,
        lang: 'en-US',
        voiceURI,
        autoPlay: false,
        onStart: () => {
            if (announceLabel) onSpeakStart?.(announceLabel);
            else onSpeakStart?.(label);
        },
        onStop: () => onSpeakStop?.(),
        onPause: () => onSpeakStop?.(),
        onError: () => onSpeakStop?.()
    });

    const handleClick = () => {
        if (!trimmedText || !canSpeak) return;
        stop();
        start();
    };

    return (
        <PlayButton
            className={className}
            type='button'
            disabled={disabled || !trimmedText || !canSpeak}
            onClick={handleClick}
            label={label}
        />
    );
}

function PokemonCard({
    pokemon,
    speciesText = '',
    genus = '',
    abilityEffects = {},
    speciesMeta,
    evolutionStages = [],
    evolutionSprites = {},
    varietySprites = {},
    typeMatchups = { weak: [], resist: [], immune: [] }
}: PokemonCardProps) {
    const classes = usePokemonViewStyles();
    const { voices } = useVoices();
    const [activeSpeechLabel, setActiveSpeechLabel] = React.useState<string | null>(null);
    const cryAudioRef = React.useRef<HTMLAudioElement | null>(null);
    const imageSrc = pokemon.sprites.front_default ?? '';
    const cryUrl = pokemon.cries?.latest ?? pokemon.cries?.legacy ?? '';
    const statItems = pokemon.stats ?? [];
    const weightKg = pokemon.weight ? (pokemon.weight / 10).toFixed(1) : '';
    const heightM = pokemon.height ? (pokemon.height / 10).toFixed(1) : '';
    const varietyList = (speciesMeta?.varieties ?? []).filter((item) => !item.is_default);
    const traitChips = [
        ...(speciesMeta?.eggGroups ?? []).map((name) => ({ label: name, kind: 'Egg group' })),
        speciesMeta?.habitat ? { label: speciesMeta.habitat, kind: 'Habitat' } : null,
        speciesMeta?.color ? { label: speciesMeta.color, kind: 'Color' } : null,
        speciesMeta?.shape ? { label: speciesMeta.shape, kind: 'Shape' } : null
    ].filter(Boolean) as { label: string; kind: string }[];
    const handlePlayCry = () => {
        if (!cryUrl) return;
        if (cryAudioRef.current) {
            cryAudioRef.current.pause();
            cryAudioRef.current.currentTime = 0;
            cryAudioRef.current = null;
        }
        const audio = new Audio(cryUrl);
        cryAudioRef.current = audio;
        audio.play().catch(() => {
            // no-op
        });
    };

    const typeChipStyle = (typeName: string) => {
        const palette = getTypeTheme(typeName);
        return {
            background: palette.accent,
            color: '#fff',
            border: '1px solid rgba(15, 23, 42, 0.2)'
        } as React.CSSProperties;
    };

    const formatEvolutionDetail = (detail: any) => {
        if (!detail) return '';
        const parts: string[] = [];
        const trigger = detail.trigger?.name ?? '';
        if (trigger === 'level-up') {
            if (detail.min_level) parts.push(`level ${detail.min_level}`);
        } else if (trigger === 'trade') {
            parts.push('trade');
            if (detail.held_item?.name) {
                parts.push(`holding ${detail.held_item.name.replace('-', ' ')}`);
            }
        } else if (trigger === 'use-item' && detail.item?.name) {
            parts.push(`use ${detail.item.name.replace('-', ' ')}`);
        } else if (trigger) {
            parts.push(trigger.replace('-', ' '));
        }

        if (detail.min_happiness) parts.push('high friendship');
        if (detail.min_affection) parts.push('high affection');
        if (detail.min_beauty) parts.push('high beauty');
        if (detail.time_of_day) parts.push(`at ${detail.time_of_day}`);
        if (detail.known_move?.name) parts.push(`knowing ${detail.known_move.name.replace('-', ' ')}`);
        if (detail.location?.name) parts.push(`at ${detail.location.name.replace('-', ' ')}`);
        if (detail.needs_overworld_rain) parts.push('while raining');
        if (detail.relative_physical_stats !== null && detail.relative_physical_stats !== undefined) {
            if (detail.relative_physical_stats > 0) parts.push('with higher attack');
            if (detail.relative_physical_stats < 0) parts.push('with higher defense');
            if (detail.relative_physical_stats === 0) parts.push('with equal attack and defense');
        }

        return parts.join(', ');
    };

    const normalizeSpeech = (value: string) =>
        value
            .replace(/-/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();

    const naturalList = (items: string[]) => {
        const cleaned = items.map(normalizeSpeech).filter(Boolean);
        if (cleaned.length === 0) return '';
        if (cleaned.length === 1) return cleaned[0];
        if (cleaned.length === 2) return `${cleaned[0]} and ${cleaned[1]}`;
        return `${cleaned.slice(0, -1).join(', ')}, and ${cleaned[cleaned.length - 1]}`;
    };

    const abilityText = (() => {
        const entries = pokemon.abilities.map(({ ability }) => {
            const effect = abilityEffects[ability.name] ?? '';
            return `${normalizeSpeech(ability.name)}. ${effect}`;
        });
        if (entries.length === 0) return '';
        if (entries.length === 1) return `Here is the ability. ${entries[0]}`;
        return `Here are the abilities. ... ${entries
            .map((entry, index) => (index === 0 ? entry : `Next, ${entry}`))
            .join(' ')}`;
    })();
    const typesText = naturalList(pokemon.types.map(({ type }) => type.name));
    const statsText = naturalList(
        statItems.map(({ stat, base_stat }) => `${normalizeSpeech(stat.name)} ${base_stat}`)
    );
    const traitsText = naturalList(traitChips.map((chip) => `${chip.kind} ${chip.label}`));
    const careText = naturalList([
        speciesMeta?.captureRate !== undefined ? `Capture rate ${speciesMeta.captureRate}` : '',
        speciesMeta?.baseHappiness !== undefined ? `Base happiness ${speciesMeta.baseHappiness}` : '',
        speciesMeta?.hatchCounter !== undefined ? `Hatch counter ${speciesMeta.hatchCounter}` : ''
    ]);
    const matchupsText = [
        typeMatchups.weak.length ? `Weak to ${naturalList(typeMatchups.weak)}` : '',
        typeMatchups.resist.length ? `Resists ${naturalList(typeMatchups.resist)}` : '',
        typeMatchups.immune.length ? `Immune to ${naturalList(typeMatchups.immune)}` : ''
    ]
        .filter(Boolean)
        .join('. ');
    const evolutionEntries = evolutionStages.flatMap((stage) => stage.entries);
    const evolutionText = evolutionEntries.length
        ? (() => {
              const base = normalizeSpeech(evolutionEntries[0]?.name ?? '');
              const steps = evolutionEntries.slice(1).map((entry) => {
                  const name = normalizeSpeech(entry.name);
                  const detail = entry.details ? normalizeSpeech(formatEvolutionDetail(entry.details)) : '';
                  return detail ? `${name} at ${detail}` : name;
              });
              if (steps.length === 0) return `${base}.`;
              if (steps.length === 1) return `${base} evolves into ${steps[0]}.`;
              const first = steps[0];
              const rest = steps.slice(1);
              return `${base} evolves into ${first}, then into ${naturalList(rest)}.`;
          })()
        : '';
    const varietiesText = naturalList(varietyList.map((item) => item.name));
    const physicalText = [
        heightM ? `Height ${heightM} meters` : '',
        weightKg ? `Weight ${weightKg} kilograms` : '',
        pokemon.base_experience ? `Base experience ${pokemon.base_experience}` : ''
    ]
        .filter(Boolean)
        .join('. ');
    const heroText = [pokemon.name, genus, speciesText, physicalText]
        .filter(Boolean)
        .map(normalizeSpeech)
        .join('. ');
    const preferredVoiceURI = React.useMemo(() => {
        if (!voices || voices.length === 0) return undefined;
        const daniel = voices.find((voice) => voice.name.toLowerCase() === 'daniel');
        return (daniel ?? voices[0])?.voiceURI;
    }, [voices]);
    const isSpeaking = Boolean(activeSpeechLabel);
    const stopCryAudio = () => {
        if (!cryAudioRef.current) return;
        cryAudioRef.current.pause();
        cryAudioRef.current.currentTime = 0;
        cryAudioRef.current = null;
    };

    React.useEffect(() => {
        const previous = document.body.style.overflow;
        if (isSpeaking) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = previous;
        }
        return () => {
            document.body.style.overflow = previous;
        };
    }, [isSpeaking]);

    const handleSpeakStart = (label: string) => {
        stopCryAudio();
        setActiveSpeechLabel(label);
    };

    const handleSpeakStop = () => {
        setActiveSpeechLabel(null);
    };

    return (
        <div className={classes.pokeBackground}>
            <div className={classes.pokeBackgroundTiles} />
            <Link className={classes.pokeBackLink} to='/main' aria-label='Back to PokeList'>
                <span className={classes.pokeBackArrow}>←</span> Back
            </Link>
            <SpeechOverlay
                visible={Boolean(activeSpeechLabel)}
                label={activeSpeechLabel ?? ''}
                imageSrc={professorImage}
                backgroundSrc={labImage}
                classes={classes}
            />
            <div className={`${classes.pokeDetails} ${classes.pokeBackgroundLayer}`}>
                <div className={classes.pokeHeroCard}>
                    {heroText ? (
                        <div className={classes.pokeHeroTopRight}>
                            <TtsButton
                                className={classes.pokePlayButton}
                                text={heroText}
                                label='Play'
                                voiceURI={preferredVoiceURI}
                                announceLabel='Overview'
                                disabled={isSpeaking}
                                onSpeakStart={handleSpeakStart}
                                onSpeakStop={handleSpeakStop}
                            />
                        </div>
                    ) : null}
                    <div className={classes.pokeHeroImageWrap}>
                        <img className={classes.pokeImage} src={imageSrc} alt={pokemon.name} />
                        <div className={classes.pokeHeroBadges}>
                            {pokemon.types.map(({ type }) => (
                                <span
                                    key={type.name}
                                    className={`${classes.pokeChip} ${classes.pokeTypeChip}`}
                                    style={typeChipStyle(type.name)}
                                >
                                    {type.name}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className={classes.pokeHeroText}>
                        <h2 className={classes.pokeName}>{pokemon.name}</h2>
                        {genus ? (
                            <p className={`${classes.pokeFact} ${classes.pokeFactStrong}`}>{genus}</p>
                        ) : null}
                        {speciesText ? <p className={classes.pokeFact}>{speciesText}</p> : null}
                        <div className={classes.pokeMetaRow}>
                            {heightM ? <span className={classes.pokeMeta}>Height: {heightM} m</span> : null}
                            {weightKg ? <span className={classes.pokeMeta}>Weight: {weightKg} kg</span> : null}
                            {pokemon.base_experience ? (
                                <span className={classes.pokeMeta}>Base XP: {pokemon.base_experience}</span>
                            ) : null}
                        </div>
                        {cryUrl || heroText ? (
                            <div className={classes.pokeHeroActions}>
                                {cryUrl ? (
                                    <PlayButton
                                        className={classes.pokePlayButton}
                                        type='button'
                                        onClick={handlePlayCry}
                                        label='Play cry'
                                    />
                                ) : null}
                            </div>
                        ) : null}
                    </div>
                </div>
                <div className={classes.pokeInfoGrid}>
                    <section className={classes.pokeSectionCard}>
                        <div className={classes.pokeSectionHeader}>
                            <h3 className={classes.pokeSectionTitle}>Abilities</h3>
                            <TtsButton
                                className={classes.pokePlayButton}
                                text={abilityText}
                                voiceURI={preferredVoiceURI}
                                announceLabel='Abilities'
                                disabled={isSpeaking}
                                onSpeakStart={handleSpeakStart}
                                onSpeakStop={handleSpeakStop}
                            />
                        </div>
                        <ul className={classes.pokeSectionList}>
                            {pokemon.abilities.map(({ ability }) => (
                                <li key={ability.name}>
                                    <span className={classes.pokeAbilityName}>{ability.name}:</span>{' '}
                                    {abilityEffects[ability.name] ?? ''}
                                </li>
                            ))}
                        </ul>
                    </section>
                    <section className={classes.pokeSectionCard}>
                        <div className={classes.pokeSectionHeader}>
                            <h3 className={classes.pokeSectionTitle}>Types</h3>
                            <TtsButton
                                className={classes.pokePlayButton}
                                text={typesText}
                                voiceURI={preferredVoiceURI}
                                announceLabel='Types'
                                disabled={isSpeaking}
                                onSpeakStart={handleSpeakStart}
                                onSpeakStop={handleSpeakStop}
                            />
                        </div>
                        <div className={classes.pokeChipGrid}>
                            {pokemon.types.map(({ type }) => (
                                <span
                                    key={type.name}
                                    className={`${classes.pokeChip} ${classes.pokeTypeChip}`}
                                    style={typeChipStyle(type.name)}
                                >
                                    {type.name}
                                </span>
                            ))}
                        </div>
                    </section>
                    <section className={classes.pokeSectionCard}>
                        <div className={classes.pokeSectionHeader}>
                            <h3 className={classes.pokeSectionTitle}>Base Stats</h3>
                            <TtsButton
                                className={classes.pokePlayButton}
                                text={statsText}
                                voiceURI={preferredVoiceURI}
                                announceLabel='Base stats'
                                disabled={isSpeaking}
                                onSpeakStart={handleSpeakStart}
                                onSpeakStop={handleSpeakStop}
                            />
                        </div>
                        <ul className={classes.pokeSectionList}>
                            {statItems.map(({ stat, base_stat }) => (
                                <li key={stat.name} className={classes.pokeStatItem}>
                                    <span className={classes.pokeStatName}>{stat.name}</span>
                                    <span className={classes.pokeStatValue}>{base_stat}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                    <section className={classes.pokeSectionCard}>
                        <div className={classes.pokeSectionHeader}>
                            <h3 className={classes.pokeSectionTitle}>Traits</h3>
                            <TtsButton
                                className={classes.pokePlayButton}
                                text={traitsText}
                                voiceURI={preferredVoiceURI}
                                announceLabel='Traits'
                                disabled={isSpeaking}
                                onSpeakStart={handleSpeakStart}
                                onSpeakStop={handleSpeakStop}
                            />
                        </div>
                        <div className={classes.pokeChipGrid}>
                            {traitChips.map((chip) => (
                                <span key={`${chip.kind}-${chip.label}`} className={classes.pokeChip}>
                                    <span className={classes.pokeChipLabel}>{chip.kind}:</span> {chip.label}
                                </span>
                            ))}
                        </div>
                    </section>
                    <section className={classes.pokeSectionCard}>
                        <div className={classes.pokeSectionHeader}>
                            <h3 className={classes.pokeSectionTitle}>Care & Capture</h3>
                            <TtsButton
                                className={classes.pokePlayButton}
                                text={careText}
                                voiceURI={preferredVoiceURI}
                                announceLabel='Care and capture'
                                disabled={isSpeaking}
                                onSpeakStart={handleSpeakStart}
                                onSpeakStop={handleSpeakStop}
                            />
                        </div>
                        <ul className={classes.pokeSectionList}>
                            {speciesMeta?.captureRate !== undefined ? (
                                <li>Capture rate: {speciesMeta.captureRate}</li>
                            ) : null}
                            {speciesMeta?.baseHappiness !== undefined ? (
                                <li>Base happiness: {speciesMeta.baseHappiness}</li>
                            ) : null}
                            {speciesMeta?.hatchCounter !== undefined ? (
                                <li>Hatch counter: {speciesMeta.hatchCounter}</li>
                            ) : null}
                        </ul>
                    </section>
                    <section className={classes.pokeSectionCard}>
                        <div className={classes.pokeSectionHeader}>
                            <h3 className={classes.pokeSectionTitle}>Type Matchups</h3>
                            <TtsButton
                                className={classes.pokePlayButton}
                                text={matchupsText}
                                voiceURI={preferredVoiceURI}
                                announceLabel='Type matchups'
                                disabled={isSpeaking}
                                onSpeakStart={handleSpeakStart}
                                onSpeakStop={handleSpeakStop}
                            />
                        </div>
                        <div className={classes.pokeMatchups}>
                            <div>
                                <p className={classes.pokeMatchTitle}>Weak to</p>
                                <div className={classes.pokeChipRow}>
                                    {typeMatchups.weak.map((name) => (
                                        <span
                                            key={name}
                                            className={`${classes.pokeChip} ${classes.pokeTypeChip}`}
                                            style={typeChipStyle(name)}
                                        >
                                            {name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <p className={classes.pokeMatchTitle}>Resists</p>
                                <div className={classes.pokeChipRow}>
                                    {typeMatchups.resist.map((name) => (
                                        <span
                                            key={name}
                                            className={`${classes.pokeChip} ${classes.pokeTypeChip}`}
                                            style={typeChipStyle(name)}
                                        >
                                            {name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <p className={classes.pokeMatchTitle}>Immune</p>
                                <div className={classes.pokeChipRow}>
                                    {typeMatchups.immune.map((name) => (
                                        <span
                                            key={name}
                                            className={`${classes.pokeChip} ${classes.pokeTypeChip}`}
                                            style={typeChipStyle(name)}
                                        >
                                            {name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                {evolutionStages.length ? (
                    <section className={`${classes.pokeSectionCard} ${classes.pokeWideCard}`}>
                        <div className={classes.pokeSectionHeader}>
                            <h3 className={classes.pokeSectionTitle}>Evolution Chain</h3>
                            <TtsButton
                                className={classes.pokePlayButton}
                                text={evolutionText}
                                voiceURI={preferredVoiceURI}
                                announceLabel='Evolution chain'
                                disabled={isSpeaking}
                                onSpeakStart={handleSpeakStart}
                                onSpeakStop={handleSpeakStop}
                            />
                        </div>
                        <div className={classes.pokeEvolutionRow}>
                            {evolutionStages.flatMap((stage) => stage.entries).map((entry, index, list) => (
                                <React.Fragment key={entry.name}>
                                    <Link className={classes.pokeEvolutionLink} to={`/main/${entry.name}`}>
                                        <div className={classes.pokeEvolutionCard}>
                                        {evolutionSprites[entry.name] ? (
                                            <img
                                                className={classes.pokeEvolutionSprite}
                                                src={evolutionSprites[entry.name]}
                                                alt={entry.name}
                                            />
                                        ) : null}
                                        <div>
                                            <p className={classes.pokeEvolutionName}>{entry.name}</p>
                                            {entry.details ? (
                                                <p className={classes.pokeEvolutionDetail}>
                                                    {formatEvolutionDetail(entry.details)}
                                                </p>
                                            ) : null}
                                        </div>
                                        </div>
                                    </Link>
                                    {index < list.length - 1 ? (
                                        <div className={classes.pokeEvolutionArrow} aria-hidden='true'>→</div>
                                    ) : null}
                                </React.Fragment>
                            ))}
                        </div>
                    </section>
                ) : null}
                {varietyList.length ? (
                    <section className={`${classes.pokeSectionCard} ${classes.pokeWideCard}`}>
                        <div className={classes.pokeSectionHeader}>
                            <h3 className={classes.pokeSectionTitle}>Varieties</h3>
                            <TtsButton
                                className={classes.pokePlayButton}
                                text={varietiesText}
                                voiceURI={preferredVoiceURI}
                                announceLabel='Varieties'
                                disabled={isSpeaking}
                                onSpeakStart={handleSpeakStart}
                                onSpeakStop={handleSpeakStop}
                            />
                        </div>
                        <div className={classes.pokeVarietyGrid}>
                            {varietyList.map((item) => (
                                <Link key={item.name} className={classes.pokeVarietyLink} to={`/main/${item.name}`}>
                                    <div className={classes.pokeVarietyCard}>
                                    {varietySprites[item.name] ? (
                                        <img
                                            className={classes.pokeVarietySprite}
                                            src={varietySprites[item.name]}
                                            alt={item.name}
                                        />
                                    ) : null}
                                    <span className={classes.pokeVarietyName}>{item.name}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                ) : null}
            </div>
        </div>

    );
};

export default PokemonCard;
