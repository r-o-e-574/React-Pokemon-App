import React from 'react';
import { Link } from 'react-router-dom';
import { useSpeech, useVoices } from 'react-text-to-speech';
import { getTypeTheme } from '../styles/typeTheme';
import { usePokemonViewStyles } from '../styles/pokemonViewStyles';
import PlayButton from './PlayButton';
import SpeechOverlay from './SpeechOverlay';
import professorImage from '../images/VSScientist_SV.png';
import labImage from '../images/lab.jpeg';
import type { Pokemon } from '../types/pokemon';

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
    style?: React.CSSProperties;
};

function TtsButton({
    text,
    label = 'Play',
    className,
    voiceURI,
    announceLabel,
    disabled,
    onSpeakStart,
    onSpeakStop,
    style
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
            style={style}
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
    const heightInches = pokemon.height ? pokemon.height * 3.93701 : 0;
    const heightFeet = heightInches ? Math.floor(heightInches / 12) : 0;
    const heightRemainder = heightInches ? Math.round(heightInches % 12) : 0;
    const heightUs = heightInches ? `${heightFeet} ft ${heightRemainder} in` : '';
    const weightLbs = pokemon.weight ? (pokemon.weight * 0.220462).toFixed(1) : '';
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
            if (detail.min_level) parts.push(`Level ${detail.min_level}`);
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
    const typesNarration = (() => {
        if (!typesText) return '';
        if (pokemon.types.length === 1) return `${pokemon.name} is a ${typesText} type Pokemon.`;
        return `${pokemon.name} has ${typesText} types.`;
    })();
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
    const evolutionGroups = evolutionStages.map((stage) => stage.entries).filter((entries) => entries.length > 0);
    const evolutionText = evolutionGroups.length
        ? (() => {
              const base = normalizeSpeech(evolutionGroups[0]?.[0]?.name ?? '');
              const hasBranches = evolutionGroups.some((group, index) => index > 0 && group.length > 1);
              const formatEntry = (entry: { name: string; details: any }) => {
                  const name = normalizeSpeech(entry.name);
                  const detail = entry.details ? normalizeSpeech(formatEvolutionDetail(entry.details)) : '';
                  return detail ? `${name} at ${detail}` : name;
              };
              if (!hasBranches && evolutionGroups.length <= 3) {
                  const steps = evolutionGroups.slice(1).flat().map(formatEntry);
                  if (steps.length === 0) return `${base}.`;
                  if (steps.length === 1) return `${base} evolves into ${steps[0]}.`;
                  const first = steps[0];
                  const rest = steps.slice(1);
                  return `${base} evolves into ${first}, then into ${naturalList(rest)}.`;
              }
              const stageOne = evolutionGroups[1] ? naturalList(evolutionGroups[1].map(formatEntry)) : '';
              const later = evolutionGroups.slice(2).flat();
              const laterText = later.length ? naturalList(later.map(formatEntry)) : '';
              const parts = [];
              if (stageOne) parts.push(`${base} can evolve into ${stageOne}.`);
              if (laterText) parts.push(`Later evolutions include ${laterText}.`);
              if (parts.length === 0) return `${base}.`;
              return parts.join(' ');
          })()
        : '';
    const varietiesText = naturalList(varietyList.map((item) => item.name));
    const physicalText = [
        heightUs ? `Height ${heightUs}` : '',
        weightLbs ? `Weight ${weightLbs} pounds` : '',
        pokemon.base_experience ? `Base experience ${pokemon.base_experience}` : ''
    ]
        .filter(Boolean)
        .join('. ');
    const abilityNames = pokemon.abilities.map(({ ability }) => ability.name);
    const heroAbilityText = abilityNames.length
        ? `Abilities include ${naturalList(abilityNames.map(normalizeSpeech))}`
        : '';
    const statLookup = new Map(statItems.map((item) => [item.stat.name, item.base_stat]));
    const heroStatsParts = [
        heightUs ? `Height ${heightUs}` : '',
        weightLbs ? `Weight ${weightLbs} pounds` : '',
        pokemon.base_experience ? `Base experience ${pokemon.base_experience}` : '',
        statLookup.has('hp') ? `HP ${statLookup.get('hp')}` : '',
        statLookup.has('attack') ? `Attack ${statLookup.get('attack')}` : '',
        statLookup.has('defense') ? `Defense ${statLookup.get('defense')}` : '',
        statLookup.has('speed') ? `Speed ${statLookup.get('speed')}` : ''
    ].filter(Boolean);
    const heroStatsText = heroStatsParts.length ? `Base stats: ${heroStatsParts.join(', ')}` : '';
    const heroText = [typesNarration, genus, speciesText, physicalText, heroAbilityText, heroStatsText]
        .filter(Boolean)
        .map(normalizeSpeech)
        .join('. ');
    const preferredVoiceURI = React.useMemo(() => {
        if (!voices || voices.length === 0) return undefined;
        const daniel = voices.find((voice) => voice.name.toLowerCase() === 'daniel');
        return (daniel ?? voices[0])?.voiceURI;
    }, [voices]);
    const primaryType = pokemon.types[0]?.type.name;
    const isLightColor = (hex: string) => {
        const normalized = hex.replace('#', '');
        if (normalized.length !== 6) return false;
        const r = parseInt(normalized.slice(0, 2), 16) / 255;
        const g = parseInt(normalized.slice(2, 4), 16) / 255;
        const b = parseInt(normalized.slice(4, 6), 16) / 255;
        const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        return luminance > 0.6;
    };
    const hexToRgba = (hex: string, alpha: number) => {
        const normalized = hex.replace('#', '');
        if (normalized.length !== 6) return `rgba(15, 23, 42, ${alpha})`;
        const r = parseInt(normalized.slice(0, 2), 16);
        const g = parseInt(normalized.slice(2, 4), 16);
        const b = parseInt(normalized.slice(4, 6), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };
    const playButtonStyle = React.useMemo(() => {
        if (!primaryType) return undefined;
        const palette = getTypeTheme(primaryType);
        const accent = palette.accent || '#94a3b8';
        const textColor = isLightColor(accent) ? '#1f2937' : '#111827';
        const borderColor = hexToRgba(accent, 0.6);
        const borderHover = hexToRgba(accent, 0.85);
        const bgTint = hexToRgba(accent, 0.14);
        const bgHover = hexToRgba(accent, 0.22);
        const baseGradient = `linear-gradient(120deg, rgba(255, 255, 255, 0.98), ${bgTint})`;
        const hoverGradient = `linear-gradient(120deg, rgba(255, 255, 255, 1), ${bgHover})`;
        return {
            '--play-bg': baseGradient,
            '--play-bg-hover': hoverGradient,
            '--play-border': borderColor,
            '--play-border-hover': borderHover,
            '--play-ink': textColor,
            '--play-shadow': `0 6px 12px rgba(15, 23, 42, 0.12), inset 0 0 0 1px ${borderColor}`,
            '--play-shadow-hover': `0 10px 16px rgba(15, 23, 42, 0.16), inset 0 0 0 1px ${borderHover}`
        } as React.CSSProperties;
    }, [primaryType]);
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

    const handleOverlayClose = () => {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
        setActiveSpeechLabel(null);
    };

    return (
        <div className={classes.pokeBackground}>
            <div className={classes.pokeBackgroundTiles} />
            <SpeechOverlay
                visible={Boolean(activeSpeechLabel)}
                label={activeSpeechLabel ?? ''}
                imageSrc={professorImage}
                backgroundSrc={labImage}
                onClose={handleOverlayClose}
                classes={classes}
            />
            <div className={`${classes.pokeDetails} ${classes.pokeBackgroundLayer}`}>
                <div className={classes.pokeTopRow}>
                    <Link className={classes.pokeBackLink} to='/main' aria-label='Back to PokeList'>
                        <span className={classes.pokeBackArrow}>←</span>
                    </Link>
                </div>
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
                                style={playButtonStyle}
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
                        <div className={classes.pokeHeroInfoGrid}>
                            <div className={classes.pokeHeroInfoBlock}>
                                <p className={classes.pokeHeroInfoLabel}>Abilities</p>
                                <div className={classes.pokeHeroInfoList}>
                                    {abilityNames.map((name) => (
                                        <span key={name} className={classes.pokeHeroInfoChip}>
                                            {name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className={classes.pokeHeroInfoBlock}>
                                <p className={classes.pokeHeroInfoLabel}>Base stats</p>
                                <div className={classes.pokeHeroInfoList}>
                                    {heightUs ? (
                                        <span className={classes.pokeHeroInfoChip}>
                                            <span className={classes.pokeHeroInfoChipLabel}>Height:</span> {heightUs}
                                        </span>
                                    ) : null}
                                    {weightLbs ? (
                                        <span className={classes.pokeHeroInfoChip}>
                                            <span className={classes.pokeHeroInfoChipLabel}>Weight:</span> {weightLbs} lb
                                        </span>
                                    ) : null}
                                    {pokemon.base_experience ? (
                                        <span className={classes.pokeHeroInfoChip}>
                                            <span className={classes.pokeHeroInfoChipLabel}>Base XP:</span>{' '}
                                            {pokemon.base_experience}
                                        </span>
                                    ) : null}
                                    {['hp', 'attack', 'defense', 'speed'].map((statName) => {
                                        const value = statLookup.get(statName);
                                        if (value === undefined) return null;
                                        const label =
                                            statName === 'hp'
                                                ? 'HP'
                                                : statName
                                                      .split('-')
                                                      .map((part) => part[0].toUpperCase() + part.slice(1))
                                                      .join(' ');
                                        return (
                                            <span key={statName} className={classes.pokeHeroInfoChip}>
                                                <span className={classes.pokeHeroInfoChipLabel}>{label}:</span> {value}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        {cryUrl || heroText ? (
                            <div className={classes.pokeHeroActions}>
                                {cryUrl ? (
                                    <PlayButton
                                        className={classes.pokePlayButton}
                                        type='button'
                                        onClick={handlePlayCry}
                                        label='Play cry'
                                        style={playButtonStyle}
                                    />
                                ) : null}
                            </div>
                        ) : null}
                    </div>
                </div>
                <div className={classes.pokeScrollArea}>
                    <div className={classes.pokeInfoRows}>
                        <div className={classes.pokeInfoRowSecondary}>
                            <section className={`${classes.pokeSectionCard} ${classes.pokeCardStretch}`}>
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
                                    style={playButtonStyle}
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
                            <section className={`${classes.pokeSectionCard} ${classes.pokeCardStretch}`}>
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
                                    style={playButtonStyle}
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
                            <section className={`${classes.pokeSectionCard} ${classes.pokeCardStretch}`}>
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
                                    style={playButtonStyle}
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
                        </div>
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
                                    style={playButtonStyle}
                                />
                            </div>
                            <div className={classes.pokeEvolutionRow}>
                                {evolutionStages.map((stage, stageIndex) => (
                                    <React.Fragment key={`stage-${stage.stage ?? stageIndex}`}>
                                        <div className={classes.pokeEvolutionStageGroup}>
                                            {stage.entries.map((entry) => (
                                                <Link
                                                    key={entry.name}
                                                    className={classes.pokeEvolutionLink}
                                                    to={`/main/${entry.name}`}
                                                >
                                                    <div className={classes.pokeEvolutionCard}>
                                                        {evolutionSprites[entry.name] ? (
                                                            <img
                                                                className={classes.pokeEvolutionSprite}
                                                                src={evolutionSprites[entry.name]}
                                                                alt={entry.name}
                                                            />
                                                        ) : null}
                                                        <div>
                                                            <div className={classes.pokeEvolutionText}>
                                                                <p className={classes.pokeEvolutionName}>{entry.name}</p>
                                                                {entry.details ? (
                                                                    <p className={classes.pokeEvolutionDetail}>
                                                                        {formatEvolutionDetail(entry.details)}
                                                                    </p>
                                                                ) : null}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                        {stageIndex < evolutionStages.length - 1 ? (
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
                                    style={playButtonStyle}
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
        </div>

    );
};

export default PokemonCard;
