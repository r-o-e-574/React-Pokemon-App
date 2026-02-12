import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useVoices } from 'react-text-to-speech';
import { getTypeTheme } from '../styles/typeTheme';
import { usePokemonViewStyles } from '../styles/pokemonViewStyles';
import HeroPanel from './pokemonCard/HeroPanel';
import MatchupsPanel from './pokemonCard/MatchupsPanel';
import TraitsPanel from './pokemonCard/TraitsPanel';
import CarePanel from './pokemonCard/CarePanel';
import EvolutionPanel from './pokemonCard/EvolutionPanel';
import VarietiesPanel from './pokemonCard/VarietiesPanel';
import SpeechOverlay from './SpeechOverlay';
import professorImage from '../images/VSScientist_SV.png';
import labImage from '../images/lab.jpeg';
import type { Pokemon } from '../types/pokemon';
import type { EvolutionDetail } from '../types/pokeapi';

interface EvolutionEntry {
  name: string;
  displayName: string;
  details: EvolutionDetail | null;
}

interface EvolutionStage {
  stage: number;
  entries: EvolutionEntry[];
}

interface TraitChip {
  label: string;
  kind: string;
}

interface TypeMatchups {
  weak: string[];
  resist: string[];
  immune: string[];
}
type ShinyFxMode = 'on' | 'off' | null;

interface PokemonCardProps {
  pokemon: Pokemon;
  speciesText?: string;
  genus?: string;
  speciesMeta?: {
    eggGroups: string[];
    habitat?: string;
    color?: string;
    shape?: string;
    captureRate?: number;
    baseHappiness?: number;
    hatchCounter?: number;
    varieties: { name: string; displayName: string; is_default: boolean }[];
  };
  evolutionStages?: EvolutionStage[];
  evolutionSprites?: Record<string, string>;
  varietySprites?: Record<string, string>;
  typeMatchups?: TypeMatchups;
}

function PokemonCard({
  pokemon,
  speciesText = '',
  genus = '',
  speciesMeta,
  evolutionStages = [],
  evolutionSprites = {},
  varietySprites = {},
  typeMatchups = { weak: [], resist: [], immune: [] }
}: PokemonCardProps) {
  const classes = usePokemonViewStyles();
  const { voices } = useVoices();
  const [activeSpeechLabel, setActiveSpeechLabel] = useState<string | null>(null);
  const [isShiny, setIsShiny] = useState(false);
  const [shinyFxMode, setShinyFxMode] = useState<ShinyFxMode>(null);
  const [shinyFxTick, setShinyFxTick] = useState(0);
  const cryAudioRef = useRef<HTMLAudioElement | null>(null);
  const shinyBurstTimeoutRef = useRef<number | null>(null);
  const defaultImageSrc =
    pokemon.sprites.other?.['official-artwork']?.front_default ??
    pokemon.sprites.other?.home?.front_default ??
    pokemon.sprites.front_default ??
    '';
  const shinyImageSrc =
    pokemon.sprites.other?.['official-artwork']?.front_shiny ??
    pokemon.sprites.other?.home?.front_shiny ??
    pokemon.sprites.front_shiny ??
    '';
  const canToggleShiny = Boolean(shinyImageSrc);
  const imageSrc = isShiny && canToggleShiny ? shinyImageSrc : defaultImageSrc;
  const cryUrl = pokemon.cries?.latest ?? pokemon.cries?.legacy ?? '';
  const statItems = pokemon.stats ?? [];
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
  ].filter((chip): chip is TraitChip => Boolean(chip));
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
  const handleToggleShiny = () => {
    if (!canToggleShiny) return;
    setIsShiny((prev) => {
      const next = !prev;
      setShinyFxMode(next ? 'on' : 'off');
      setShinyFxTick((tick) => tick + 1);
      if (shinyBurstTimeoutRef.current) {
        window.clearTimeout(shinyBurstTimeoutRef.current);
      }
      shinyBurstTimeoutRef.current = window.setTimeout(
        () => {
          setShinyFxMode(null);
          shinyBurstTimeoutRef.current = null;
        },
        next ? 720 : 560
      );
      return next;
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

  const formatEvolutionDetail = (detail: EvolutionDetail | null) => {
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

  const normalizeSpeech = (value: string) => value.replace(/-/g, ' ').replace(/\s+/g, ' ').trim();

  const naturalList = (items: string[]) => {
    const cleaned = items.map(normalizeSpeech).filter(Boolean);
    if (cleaned.length === 0) return '';
    if (cleaned.length === 1) return cleaned[0];
    if (cleaned.length === 2) return `${cleaned[0]} and ${cleaned[1]}`;
    return `${cleaned.slice(0, -1).join(', ')}, and ${cleaned[cleaned.length - 1]}`;
  };

  const typesText = naturalList(pokemon.types.map(({ type }) => type.name));
  const pokemonDisplayName = pokemon.displayName ?? normalizeSpeech(pokemon.name);
  const typesNarration = (() => {
    if (!typesText) return '';
    if (pokemon.types.length === 1) return `${pokemonDisplayName} is a ${typesText} type Pokemon.`;
    return `${pokemonDisplayName} has ${typesText} types.`;
  })();
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
  const evolutionGroups = evolutionStages
    .map((stage) => stage.entries)
    .filter((entries) => entries.length > 0);
  const evolutionText = evolutionGroups.length
    ? (() => {
        const base = normalizeSpeech(evolutionGroups[0]?.[0]?.name ?? '');
        const hasBranches = evolutionGroups.some((group, index) => index > 0 && group.length > 1);
        const formatEntry = (entry: EvolutionEntry) => {
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
  const varietiesText = naturalList(varietyList.map((item) => item.displayName));
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
  const heroText = [
    typesNarration,
    genus,
    speciesText,
    physicalText,
    heroAbilityText,
    heroStatsText
  ]
    .filter(Boolean)
    .map(normalizeSpeech)
    .join('. ');
  const preferredVoiceURI = useMemo(() => {
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
  const playButtonStyle = useMemo(() => {
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

  useEffect(() => {
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
  useEffect(() => {
    setIsShiny(false);
    setShinyFxMode(null);
    setShinyFxTick(0);
    if (shinyBurstTimeoutRef.current) {
      window.clearTimeout(shinyBurstTimeoutRef.current);
      shinyBurstTimeoutRef.current = null;
    }
  }, [pokemon.name]);
  useEffect(() => {
    return () => {
      if (shinyBurstTimeoutRef.current) {
        window.clearTimeout(shinyBurstTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className={classes.pokeBackground}>
      <div className={classes.pokeBackgroundTiles} />
      <SpeechOverlay
        visible={Boolean(activeSpeechLabel)}
        label={activeSpeechLabel ?? ''}
        imageSrc={professorImage}
        backgroundSrc={labImage}
        onClose={handleOverlayClose}
      />
      <div className={`${classes.pokeDetails} ${classes.pokeBackgroundLayer}`}>
        <div className={classes.pokeTopRow}>
          <Link className={classes.pokeBackLink} to="/main" aria-label="Back to PokeList">
            <span className={classes.pokeBackArrow}>←</span>
          </Link>
        </div>
        <HeroPanel
          pokemon={pokemon}
          imageSrc={imageSrc}
          isShiny={isShiny}
          canToggleShiny={canToggleShiny}
          shinyFxMode={shinyFxMode}
          shinyFxTick={shinyFxTick}
          cryUrl={cryUrl}
          genus={genus}
          speciesText={speciesText}
          abilityNames={abilityNames}
          heightUs={heightUs}
          weightLbs={weightLbs}
          baseExperience={pokemon.base_experience}
          statLookup={statLookup}
          typeChipStyle={typeChipStyle}
          heroText={heroText}
          playButtonStyle={playButtonStyle}
          preferredVoiceURI={preferredVoiceURI}
          isSpeaking={isSpeaking}
          onSpeakStart={handleSpeakStart}
          onSpeakStop={handleSpeakStop}
          onPlayCry={handlePlayCry}
          onToggleShiny={handleToggleShiny}
        />
        <div className={classes.pokeScrollArea}>
          <div className={classes.pokeScrollContent}>
            <div className={classes.pokeInfoRows}>
              <div className={classes.pokeInfoRowSecondary}>
                <MatchupsPanel
                  typeMatchups={typeMatchups}
                  matchupsText={matchupsText}
                  typeChipStyle={typeChipStyle}
                  playButtonStyle={playButtonStyle}
                  preferredVoiceURI={preferredVoiceURI}
                  isSpeaking={isSpeaking}
                  onSpeakStart={handleSpeakStart}
                  onSpeakStop={handleSpeakStop}
                />
                <TraitsPanel
                  traitChips={traitChips}
                  traitsText={traitsText}
                  playButtonStyle={playButtonStyle}
                  preferredVoiceURI={preferredVoiceURI}
                  isSpeaking={isSpeaking}
                  onSpeakStart={handleSpeakStart}
                  onSpeakStop={handleSpeakStop}
                />
                <CarePanel
                  speciesMeta={speciesMeta}
                  careText={careText}
                  playButtonStyle={playButtonStyle}
                  preferredVoiceURI={preferredVoiceURI}
                  isSpeaking={isSpeaking}
                  onSpeakStart={handleSpeakStart}
                  onSpeakStop={handleSpeakStop}
                />
              </div>
            </div>
            <EvolutionPanel
              evolutionStages={evolutionStages}
              evolutionSprites={evolutionSprites}
              evolutionText={evolutionText}
              formatEvolutionDetail={formatEvolutionDetail}
              playButtonStyle={playButtonStyle}
              preferredVoiceURI={preferredVoiceURI}
              isSpeaking={isSpeaking}
              onSpeakStart={handleSpeakStart}
              onSpeakStop={handleSpeakStop}
            />
            {varietyList.length ? (
              <VarietiesPanel
                varietyList={varietyList}
                varietySprites={varietySprites}
                varietiesText={varietiesText}
                playButtonStyle={playButtonStyle}
                preferredVoiceURI={preferredVoiceURI}
                isSpeaking={isSpeaking}
                onSpeakStart={handleSpeakStart}
                onSpeakStop={handleSpeakStop}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
