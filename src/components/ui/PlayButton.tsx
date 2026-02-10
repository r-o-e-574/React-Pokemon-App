import React from 'react';

type PlayButtonProps = {
    label: string;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
};

function PlayButton({ label, onClick, disabled, className, type = 'button' }: PlayButtonProps) {
    return (
        <button className={className} type={type} disabled={disabled} onClick={onClick}>
            {label}
        </button>
    );
}

export default PlayButton;
