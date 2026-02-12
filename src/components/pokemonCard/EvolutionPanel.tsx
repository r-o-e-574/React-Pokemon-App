import React from 'react';
import { Link } from 'react-router-dom';
import { usePokemonViewStyles } from '../../styles/pokemonViewStyles';
import { usePanelStyles } from '../../styles/panelStyles';
import PokePanel from '../PokePanel';
import TtsButton from './TtsButton';
import type { EvolutionDetail } from '../../types/pokeapi';

interface EvolutionEntry {
  name: string;
  details: EvolutionDetail | null;
}

interface EvolutionStage {
  stage: number;
  entries: EvolutionEntry[];
}

interface EvolutionPanelProps {
  evolutionStages: EvolutionStage[];
  evolutionSprites: Record<string, string>;
  evolutionText: string;
  formatEvolutionDetail: (detail: EvolutionStage['entries'][number]['details']) => string;
  playButtonStyle?: React.CSSProperties;
  preferredVoiceURI?: string;
  isSpeaking: boolean;
  onSpeakStart: (label: string) => void;
  onSpeakStop: () => void;
}

function EvolutionPanel({
  evolutionStages,
  evolutionSprites,
  evolutionText,
  formatEvolutionDetail,
  playButtonStyle,
  preferredVoiceURI,
  isSpeaking,
  onSpeakStart,
  onSpeakStop
}: EvolutionPanelProps) {
  const classes = usePokemonViewStyles();
  const panelClasses = usePanelStyles();

  if (!evolutionStages.length) return null;

  return (
    <PokePanel
      className={`${panelClasses.panel} ${classes.pokeWideCard}`}
      headerClassName={panelClasses.header}
      titleClassName={panelClasses.title}
      bodyClassName={panelClasses.body}
      title="Evolution Chain"
      action={
        <TtsButton
          className={classes.pokePlayButton}
          text={evolutionText}
          voiceURI={preferredVoiceURI}
          announceLabel="Evolution chain"
          disabled={isSpeaking}
          onSpeakStart={onSpeakStart}
          onSpeakStop={onSpeakStop}
          style={playButtonStyle}
        />
      }
    >
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
                    ) : (
                      <div className={classes.pokeEvolutionFallback}>Uh oh</div>
                    )}
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
              <div className={classes.pokeEvolutionArrow} aria-hidden="true">
                →
              </div>
            ) : null}
          </React.Fragment>
        ))}
      </div>
    </PokePanel>
  );
}

export default EvolutionPanel;
