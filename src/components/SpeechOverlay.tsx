import { createUseStyles } from 'react-jss';
import Narrator from './Narrator';

interface SpeechOverlayProps {
  visible: boolean;
  label: string;
  imageSrc: string;
  title?: string;
  backgroundSrc?: string;
  onClose?: () => void;
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
    maxWidth: 420,
    pointerEvents: 'none'
  }
});

function SpeechOverlay({
  visible,
  label,
  imageSrc,
  title = 'Professor Espino',
  backgroundSrc,
  onClose
}: SpeechOverlayProps) {
  const classes = useStyles();
  if (!visible) return null;

  return (
    <div className={classes.overlay} aria-live="polite">
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
