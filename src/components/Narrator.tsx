import { useState } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  narratorFrame: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 0,
    padding: 12,
    width: '100%',
    maxWidth: 340,
    borderRadius: 22,
    border:
      '2px solid color-mix(in srgb, var(--theme-border, rgba(43, 63, 99, 0.4)) 75%, transparent)',
    backgroundColor:
      'color-mix(in srgb, var(--theme-card-bg, rgba(245, 255, 238, 0.9)) 90%, white 10%)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    boxShadow: '0 16px 30px rgba(15, 23, 42, 0.22)',
    position: 'relative',
    boxSizing: 'border-box'
  },
  narratorAvatar: {
    width: 64,
    height: 64,
    borderRadius: 16,
    background: 'rgba(255, 255, 255, 0.9)',
    border: '1px solid var(--theme-border)',
    display: 'grid',
    placeItems: 'center',
    fontFamily: 'Pokemon',
    color: 'var(--theme-ink-strong, #1f2a44)',
    fontSize: 18
  },
  narratorImage: {
    width: 150,
    height: 160,
    objectFit: 'cover',
    borderRadius: 18,
    border: 'none',
    boxShadow: '0 10px 22px rgba(15, 23, 42, 0.2)',
    background: 'transparent'
  },
  narratorBubble: {
    background:
      'linear-gradient(135deg, rgba(255, 255, 255, 0.96), color-mix(in srgb, var(--theme-card-bg, rgba(233, 249, 226, 0.92)) 85%, white 15%))',
    border:
      '2px solid color-mix(in srgb, var(--theme-border, rgba(43, 63, 99, 0.45)) 75%, transparent)',
    borderRadius: 18,
    padding: '12px 14px',
    boxShadow: '0 12px 26px rgba(15, 23, 42, 0.2)',
    fontFamily: 'var(--ui-font)',
    textAlign: 'left',
    width: '100%',
    minHeight: 92,
    maxHeight: 92,
    overflow: 'hidden',
    marginTop: -6,
    boxSizing: 'border-box'
  },
  narratorClose: {
    position: 'absolute',
    top: 8,
    right: 8,
    border:
      '1px solid color-mix(in srgb, var(--theme-border, rgba(43, 63, 99, 0.35)) 80%, transparent)',
    background: 'rgba(255, 255, 255, 0.9)',
    color: 'var(--theme-ink-strong, #1f2a44)',
    borderRadius: 999,
    padding: '4px 8px',
    fontFamily: 'var(--ui-font)',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
    cursor: 'pointer'
  },
  narratorTitle: {
    margin: 0,
    fontSize: 12,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: 'var(--theme-ink-strong, #1f2a44)',
    fontFamily: 'var(--ui-font)'
  },
  narratorText: {
    margin: '4px 0 0',
    fontSize: 15,
    color: 'var(--theme-ink-strong, #1f2a44)',
    textTransform: 'capitalize',
    lineHeight: 1.3,
    maxHeight: 56,
    overflowY: 'auto',
    overflowX: 'hidden',
    scrollbarGutter: 'stable both-edges'
  }
});

interface NarratorProps {
  label: string;
  imageSrc: string;
  title?: string;
  backgroundSrc?: string;
  onClose?: () => void;
  className?: string;
}

function Narrator({
  label,
  imageSrc,
  title = 'Professor Espino',
  backgroundSrc,
  onClose,
  className
}: NarratorProps) {
  const classes = useStyles();
  const [showImage, setShowImage] = useState(true);

  return (
    <div
      className={`${classes.narratorFrame}${className ? ` ${className}` : ''}`}
      style={backgroundSrc ? { backgroundImage: `url(${backgroundSrc})` } : undefined}
    >
      {onClose ? (
        <button className={classes.narratorClose} type="button" onClick={onClose}>
          Close
        </button>
      ) : null}
      {showImage ? (
        <img
          className={classes.narratorImage}
          src={imageSrc}
          alt={title}
          onError={() => setShowImage(false)}
        />
      ) : (
        <div className={classes.narratorAvatar}>PC</div>
      )}
      <div className={classes.narratorBubble}>
        <p className={classes.narratorTitle}>{title}</p>
        <p className={classes.narratorText}>{label}</p>
      </div>
    </div>
  );
}

export default Narrator;
