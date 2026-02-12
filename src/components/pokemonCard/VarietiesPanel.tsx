import React from 'react';
import { Link } from 'react-router-dom';
import { usePokemonViewStyles } from '../../styles/pokemonViewStyles';
import { usePanelStyles } from '../../styles/panelStyles';
import PokePanel from '../PokePanel';
import TtsButton from './TtsButton';

interface VarietyItem {
  name: string;
  is_default: boolean;
}

interface VarietiesPanelProps {
  varietyList: VarietyItem[];
  varietySprites: Record<string, string>;
  varietiesText: string;
  playButtonStyle?: React.CSSProperties;
  preferredVoiceURI?: string;
  isSpeaking: boolean;
  onSpeakStart: (label: string) => void;
  onSpeakStop: () => void;
}

function VarietiesPanel({
  varietyList,
  varietySprites,
  varietiesText,
  playButtonStyle,
  preferredVoiceURI,
  isSpeaking,
  onSpeakStart,
  onSpeakStop
}: VarietiesPanelProps) {
  const classes = usePokemonViewStyles();
  const panelClasses = usePanelStyles();
  if (!varietyList.length) return null;

  return (
    <PokePanel
      className={`${panelClasses.panel} ${classes.pokeWideCard}`}
      headerClassName={panelClasses.header}
      titleClassName={panelClasses.title}
      bodyClassName={panelClasses.body}
      title="Varieties"
      action={
        varietiesText ? (
          <TtsButton
            className={classes.pokePlayButton}
            text={varietiesText}
            voiceURI={preferredVoiceURI}
            announceLabel="Varieties"
            disabled={isSpeaking}
            onSpeakStart={onSpeakStart}
            onSpeakStop={onSpeakStop}
            style={playButtonStyle}
          />
        ) : null
      }
    >
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
              ) : (
                <div className={classes.pokeVarietyFallback}>Uh oh</div>
              )}
              <span className={classes.pokeVarietyName}>{item.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </PokePanel>
  );
}

export default VarietiesPanel;
