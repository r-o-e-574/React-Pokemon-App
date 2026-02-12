import React from 'react';
import { usePokemonViewStyles } from '../../styles/pokemonViewStyles';
import { usePanelStyles } from '../../styles/panelStyles';
import PokePanel from '../PokePanel';
import TtsButton from './TtsButton';

interface TypeMatchups {
  weak: string[];
  resist: string[];
  immune: string[];
}

interface MatchupsPanelProps {
  typeMatchups: TypeMatchups;
  matchupsText: string;
  typeChipStyle: (typeName: string) => React.CSSProperties;
  playButtonStyle?: React.CSSProperties;
  preferredVoiceURI?: string;
  isSpeaking: boolean;
  onSpeakStart: (label: string) => void;
  onSpeakStop: () => void;
}

function MatchupsPanel({
  typeMatchups,
  matchupsText,
  typeChipStyle,
  playButtonStyle,
  preferredVoiceURI,
  isSpeaking,
  onSpeakStart,
  onSpeakStop
}: MatchupsPanelProps) {
  const classes = usePokemonViewStyles();
  const panelClasses = usePanelStyles();

  return (
    <PokePanel
      className={`${panelClasses.panel} ${classes.pokeCardStretch}`}
      headerClassName={panelClasses.header}
      titleClassName={panelClasses.title}
      bodyClassName={panelClasses.body}
      title="Type Matchups"
      action={
        <TtsButton
          className={classes.pokePlayButton}
          text={matchupsText}
          voiceURI={preferredVoiceURI}
          announceLabel="Type matchups"
          disabled={isSpeaking}
          onSpeakStart={onSpeakStart}
          onSpeakStop={onSpeakStop}
          style={playButtonStyle}
        />
      }
    >
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
    </PokePanel>
  );
}

export default MatchupsPanel;
