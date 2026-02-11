import React from 'react';

type PlayButtonProps = {
    label: string;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    style?: React.CSSProperties;
};

function PlayButton({ label, onClick, disabled, className, type = 'button', style }: PlayButtonProps) {
    return (
        <button className={className} type={type} disabled={disabled} onClick={onClick} style={style}>
            {label}
        </button>
    );
}

export default PlayButton;
