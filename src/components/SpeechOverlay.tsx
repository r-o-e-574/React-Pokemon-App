import { createUseStyles } from 'react-jss';
import Narrator from './Narrator';

interface SpeechOverlayProps {
  visible: boolean;
  label: string;
  imageSrc: string;
  title?: string;
  backgroundSrc?: string;
  onClose?: () => void;
  compact?: boolean;
}

const useStyles = createUseStyles({
  overlay: {
    position: 'fixed',
    right: 20,
    bottom: 20,
    display: 'flex',
    alignItems: 'flex-end',
    gap: 16,
    zIndex: 60,
    width: 340,
    maxWidth: 'calc(100vw - 40px)',
    pointerEvents: 'auto'
  },
  overlayCompact: {
    right: 10,
    bottom: 10,
    width: 260,
    transform: 'scale(0.78)',
    transformOrigin: 'bottom right'
  }
});

function SpeechOverlay({
  visible,
  label,
  imageSrc,
  title = 'Professor Espino',
  backgroundSrc,
  onClose,
  compact = false
}: SpeechOverlayProps) {
  const classes = useStyles();
  if (!visible) return null;

  return (
    <div
      className={`${classes.overlay} ${compact ? classes.overlayCompact : ''}`}
      aria-live="polite"
    >
      <Narrator
        label={label}
        imageSrc={imageSrc}
        title={title}
        backgroundSrc={backgroundSrc}
        onClose={onClose}
      />
    </div>
  );
}

export default SpeechOverlay;
