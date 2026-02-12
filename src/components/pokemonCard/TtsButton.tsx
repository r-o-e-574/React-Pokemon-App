import React from 'react';
import { useSpeech } from 'react-text-to-speech';
import PlayButton from '../PlayButton';

interface TtsButtonProps {
  text: string;
  label?: string;
  className: string;
  voiceURI?: string;
  announceLabel?: string;
  disabled?: boolean;
  onSpeakStart?: (label: string) => void;
  onSpeakStop?: () => void;
  style?: React.CSSProperties;
}

function TtsButton({
  text,
  label = 'Play',
  className,
  voiceURI,
  announceLabel,
  disabled,
  onSpeakStart,
  onSpeakStop,
  style
}: TtsButtonProps) {
  const canSpeak = typeof window !== 'undefined' && 'speechSynthesis' in window;
  const trimmedText = text.trim();
  const spokenBody = trimmedText.endsWith('.') ? trimmedText : `${trimmedText}.`;
  const spokenText = announceLabel ? `${announceLabel}. ${spokenBody}` : spokenBody;
  const { start, stop } = useSpeech({
    text: spokenText,
    rate: 0.9,
    pitch: 0.95,
    volume: 1,
    lang: 'en-US',
    voiceURI,
    autoPlay: false,
    onStart: () => {
      if (announceLabel) onSpeakStart?.(announceLabel);
      else onSpeakStart?.(label);
    },
    onStop: () => onSpeakStop?.(),
    onPause: () => onSpeakStop?.(),
    onError: () => onSpeakStop?.()
  });

  const handleClick = () => {
    if (!trimmedText || !canSpeak) return;
    stop();
    start();
  };

  return (
    <PlayButton
      className={className}
      type="button"
      disabled={disabled || !trimmedText || !canSpeak}
      onClick={handleClick}
      label={label}
      style={style}
    />
  );
}

export default TtsButton;
