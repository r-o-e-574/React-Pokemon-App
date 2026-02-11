import React from 'react';
import { usePokemonViewStyles } from '../../styles/pokemonViewStyles';
import { usePanelStyles } from '../../styles/panelStyles';
import PokePanel from '../PokePanel';
import TtsButton from './TtsButton';
type CarePanelProps = {
    speciesMeta?: {
        captureRate?: number;
        baseHappiness?: number;
        hatchCounter?: number;
    };
    careText: string;
    playButtonStyle?: React.CSSProperties;
    preferredVoiceURI?: string;
    isSpeaking: boolean;
    onSpeakStart: (label: string) => void;
    onSpeakStop: () => void;
};

function CarePanel({
    speciesMeta,
    careText,
    playButtonStyle,
    preferredVoiceURI,
    isSpeaking,
    onSpeakStart,
    onSpeakStop
}: CarePanelProps) {
    const classes = usePokemonViewStyles();
    const panelClasses = usePanelStyles();

    return (
        <PokePanel
            className={`${panelClasses.panel} ${classes.pokeCardStretch}`}
            headerClassName={panelClasses.header}
            titleClassName={panelClasses.title}
            bodyClassName={panelClasses.body}
            title='Care & Capture'
            action={
                <TtsButton
                    className={classes.pokePlayButton}
                    text={careText}
                    voiceURI={preferredVoiceURI}
                    announceLabel='Care and capture'
                    disabled={isSpeaking}
                    onSpeakStart={onSpeakStart}
                    onSpeakStop={onSpeakStop}
                    style={playButtonStyle}
                />
            }
        >
            <ul className={classes.pokeSectionList}>
                {speciesMeta?.captureRate !== undefined ? <li>Capture rate: {speciesMeta.captureRate}</li> : null}
                {speciesMeta?.baseHappiness !== undefined ? <li>Base happiness: {speciesMeta.baseHappiness}</li> : null}
                {speciesMeta?.hatchCounter !== undefined ? <li>Hatch counter: {speciesMeta.hatchCounter}</li> : null}
            </ul>
        </PokePanel>
    );
}

export default CarePanel;
