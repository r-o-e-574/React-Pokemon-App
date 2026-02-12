import React from 'react';
import { usePokemonViewStyles } from '../../styles/pokemonViewStyles';
import { usePanelStyles } from '../../styles/panelStyles';
import PokePanel from '../PokePanel';
import TtsButton from './TtsButton';

interface TraitChip {
  label: string;
  kind: string;
}

interface TraitsPanelProps {
  traitChips: TraitChip[];
  traitsText: string;
  playButtonStyle?: React.CSSProperties;
  preferredVoiceURI?: string;
  isSpeaking: boolean;
  onSpeakStart: (label: string) => void;
  onSpeakStop: () => void;
}

function TraitsPanel({
  traitChips,
  traitsText,
  playButtonStyle,
  preferredVoiceURI,
  isSpeaking,
  onSpeakStart,
  onSpeakStop
}: TraitsPanelProps) {
  const classes = usePokemonViewStyles();
  const panelClasses = usePanelStyles();

  return (
    <PokePanel
      className={`${panelClasses.panel} ${classes.pokeCardStretch}`}
      headerClassName={panelClasses.header}
      titleClassName={panelClasses.title}
      bodyClassName={panelClasses.body}
      title="Traits"
      action={
        <TtsButton
          className={classes.pokePlayButton}
          text={traitsText}
          voiceURI={preferredVoiceURI}
          announceLabel="Traits"
          disabled={isSpeaking}
          onSpeakStart={onSpeakStart}
          onSpeakStop={onSpeakStop}
          style={playButtonStyle}
        />
      }
    >
      <div className={classes.pokeChipGrid}>
        {traitChips.map((chip) => (
          <span key={`${chip.kind}-${chip.label}`} className={classes.pokeChip}>
            <span className={classes.pokeChipLabel}>{chip.kind}:</span> {chip.label}
          </span>
        ))}
      </div>
    </PokePanel>
  );
}

export default TraitsPanel;
