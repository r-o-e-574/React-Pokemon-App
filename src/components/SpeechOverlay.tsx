import React from 'react';

type SpeechOverlayProps = {
    visible: boolean;
    label: string;
    imageSrc: string;
    title?: string;
    backgroundSrc?: string;
    onClose?: () => void;
    classes: {
        pokeSpeechOverlay: string;
        pokeSpeechFrame: string;
        pokeSpeechAvatar: string;
        pokeSpeechImage: string;
        pokeSpeechBubble: string;
        pokeSpeechTitle: string;
        pokeSpeechText: string;
        pokeSpeechClose: string;
    };
};

function SpeechOverlay({
    visible,
    label,
    imageSrc,
    title = 'Professor Espino',
    backgroundSrc,
    onClose,
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
                {onClose ? (
                    <button className={classes.pokeSpeechClose} type='button' onClick={onClose}>
                        Close
                    </button>
                ) : null}
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
