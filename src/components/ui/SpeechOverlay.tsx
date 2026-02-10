import React from 'react';

type SpeechOverlayProps = {
    visible: boolean;
    label: string;
    imageSrc: string;
    title?: string;
    backgroundSrc?: string;
    classes: {
        pokeSpeechOverlay: string;
        pokeSpeechFrame: string;
        pokeSpeechPortrait: string;
        pokeSpeechAvatar: string;
        pokeSpeechImage: string;
        pokeSpeechBubble: string;
        pokeSpeechTitle: string;
        pokeSpeechText: string;
    };
};

function SpeechOverlay({
    visible,
    label,
    imageSrc,
    title = 'Professor Cedar',
    backgroundSrc,
    classes
}: SpeechOverlayProps) {
    const [showImage, setShowImage] = React.useState(true);

    if (!visible) return null;

    return (
        <div className={classes.pokeSpeechOverlay} aria-live='polite'>
            <div
                className={classes.pokeSpeechFrame}
                style={backgroundSrc ? { backgroundImage: `url(${backgroundSrc})` } : undefined}
            >
                {showImage ? (
                    <img
                        className={classes.pokeSpeechImage}
                        src={imageSrc}
                        alt={title}
                        onError={() => setShowImage(false)}
                    />
                ) : (
                    <div className={classes.pokeSpeechAvatar}>PC</div>
                )}
                <div className={classes.pokeSpeechBubble}>
                    <p className={classes.pokeSpeechTitle}>{title}</p>
                    <p className={classes.pokeSpeechText}>{label}</p>
                </div>
            </div>
        </div>
    );
}

export default SpeechOverlay;
