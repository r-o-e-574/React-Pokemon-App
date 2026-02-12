import React from 'react';
import { usePokemonViewStyles } from '../../styles/pokemonViewStyles';
import { usePanelStyles } from '../../styles/panelStyles';
import PokePanel from '../PokePanel';
import type { Pokemon } from '../../types/pokemon';
import TtsButton from './TtsButton';

type HeroPanelProps = {
    pokemon: Pokemon;
    imageSrc: string;
    isShiny: boolean;
    canToggleShiny: boolean;
    shinyFxMode: 'on' | 'off' | null;
    cryUrl: string;
    genus: string;
    speciesText: string;
    abilityNames: string[];
    heightUs: string;
    weightLbs: string;
    baseExperience?: number;
    statLookup: Map<string, number>;
    typeChipStyle: (typeName: string) => React.CSSProperties;
    heroText: string;
    playButtonStyle?: React.CSSProperties;
    preferredVoiceURI?: string;
    isSpeaking: boolean;
    onSpeakStart: (label: string) => void;
    onSpeakStop: () => void;
    onPlayCry: () => void;
    onToggleShiny: () => void;
};

function HeroPanel({
    pokemon,
    imageSrc,
    isShiny,
    canToggleShiny,
    shinyFxMode,
    cryUrl,
    genus,
    speciesText,
    abilityNames,
    heightUs,
    weightLbs,
    baseExperience,
    statLookup,
    typeChipStyle,
    heroText,
    playButtonStyle,
    preferredVoiceURI,
    isSpeaking,
    onSpeakStart,
    onSpeakStop,
    onPlayCry,
    onToggleShiny
}: HeroPanelProps) {
    const classes = usePokemonViewStyles();
    const panelClasses = usePanelStyles();

    return (
        <PokePanel
            className={panelClasses.panel}
            headerClassName={panelClasses.header}
            titleClassName={panelClasses.title}
            bodyClassName={`${panelClasses.body} ${classes.pokeHeroCard}`}
            title={pokemon.name}
            action={
                heroText ? (
                    <TtsButton
                        className={classes.pokePlayButton}
                        text={heroText}
                        label='Play'
                        voiceURI={preferredVoiceURI}
                        announceLabel='Overview'
                        disabled={isSpeaking}
                        onSpeakStart={onSpeakStart}
                        onSpeakStop={onSpeakStop}
                        style={playButtonStyle}
                    />
                ) : null
            }
        >
            <div className={classes.pokeHeroImageWrap}>
                {canToggleShiny ? (
                    <button
                        className={`${classes.pokeShinyToggle} ${isShiny ? classes.pokeShinyToggleActive : ''}`}
                        type='button'
                        onClick={onToggleShiny}
                        aria-label={isShiny ? `Show normal ${pokemon.name}` : `Show shiny ${pokemon.name}`}
                    >
                        <span className={classes.pokeShinySparkle} aria-hidden='true'>✦</span>
                    </button>
                ) : null}
                {imageSrc ? (
                    <img
                        className={`${classes.pokeImage} ${isShiny ? classes.pokeImageShinyActive : ''} ${shinyFxMode === 'on' ? classes.pokeImageShinyFlash : ''} ${shinyFxMode === 'off' ? classes.pokeImageShinyFadeDown : ''}`}
                        src={imageSrc}
                        alt={pokemon.name}
                    />
                ) : (
                    <div className={classes.pokeImageFallback}>
                        Uh oh! The sprite wandered off for a snack.
                    </div>
                )}
                {shinyFxMode ? (
                    <>
                        <span className={`${classes.pokeShinyTwinkle} ${shinyFxMode === 'on' ? classes.pokeShinyTwinkleOn : classes.pokeShinyTwinkleOff} ${classes.pokeShinyTwinkleA}`} aria-hidden='true'>
                            ✦
                        </span>
                        <span className={`${classes.pokeShinyTwinkle} ${shinyFxMode === 'on' ? classes.pokeShinyTwinkleOn : classes.pokeShinyTwinkleOff} ${classes.pokeShinyTwinkleB}`} aria-hidden='true'>
                            ✧
                        </span>
                        <span className={`${classes.pokeShinyTwinkle} ${shinyFxMode === 'on' ? classes.pokeShinyTwinkleOn : classes.pokeShinyTwinkleOff} ${classes.pokeShinyTwinkleC}`} aria-hidden='true'>
                            ✦
                        </span>
                        <span className={`${classes.pokeShinyTwinkle} ${shinyFxMode === 'on' ? classes.pokeShinyTwinkleOn : classes.pokeShinyTwinkleOff} ${classes.pokeShinyTwinkleD}`} aria-hidden='true'>
                            ✧
                        </span>
                    </>
                ) : null}
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
                {cryUrl ? (
                    <button
                        className={classes.pokeCryButton}
                        type='button'
                        onClick={onPlayCry}
                        aria-label={`Play ${pokemon.name} cry`}
                    >
                        <svg
                            className={classes.pokeCryIcon}
                            viewBox='0 0 24 24'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                            aria-hidden='true'
                        >
                            <path d='M11 5L6 9H3v6h3l5 4V5z' fill='currentColor' />
                            <path
                                d='M15.5 8.5a4 4 0 010 7'
                                stroke='currentColor'
                                strokeWidth='2'
                                strokeLinecap='round'
                            />
                            <path
                                d='M18 6a7 7 0 010 12'
                                stroke='currentColor'
                                strokeWidth='2'
                                strokeLinecap='round'
                            />
                        </svg>
                    </button>
                ) : null}
            </div>
            <div className={classes.pokeHeroText}>
                {genus ? <p className={`${classes.pokeFact} ${classes.pokeFactStrong}`}>{genus}</p> : null}
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
                            {baseExperience ? (
                                <span className={classes.pokeHeroInfoChip}>
                                    <span className={classes.pokeHeroInfoChipLabel}>Base XP:</span> {baseExperience}
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
            </div>
        </PokePanel>
    );
}

export default HeroPanel;
