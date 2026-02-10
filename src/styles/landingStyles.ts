import { createUseStyles } from 'react-jss';
import { pokemonText } from './shared';

export const useLandingStyles = createUseStyles({
  landingRoot: {
    minHeight: '100vh',
    display: 'grid',
    placeItems: 'center',
    background: 'linear-gradient(135deg, #0f1026 0%, #2a1b4f 45%, #5b2a7a 100%)',
    position: 'relative',
    overflow: 'hidden'
  },
  landingTiles: {
    position: 'absolute',
    inset: 0,
    backgroundImage:
      'linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px)',
    backgroundSize: '64px 64px',
    opacity: 0.25,
    pointerEvents: 'none'
  },
  landingBackdrop: {
    position: 'absolute',
    width: 1200,
    height: 1200,
    borderRadius: '50%',
    background: 'none',
    top: -400,
    left: '50%',
    transform: 'translateX(-50%)',
    opacity: 0.5
  },
  landingHeader: {
    position: 'absolute',
    top: 28,
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1
  },
  landingHeaderTitle: {
    fontFamily: 'Pokemon',
    fontSize: 44,
    letterSpacing: 2,
    ...pokemonText,
    textTransform: 'uppercase'
  },
  landingCta: {
    position: 'relative',
    zIndex: 1,
    marginTop: 220,
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  },
  landingStart: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px 40px',
    borderRadius: 999,
    textDecoration: 'none',
    background: 'linear-gradient(180deg, #2f79f2, #2b6fdd)',
    color: '#ffd24f',
    fontFamily: 'Pokemon',
    textTransform: 'uppercase',
    letterSpacing: 2,
    border: '2px solid rgba(255, 255, 255, 0.7)',
    boxShadow: '0 12px 28px rgba(31, 41, 55, 0.2)',
    fontSize: 22,
    textShadow: '2.5px 2.5px 0 rgba(31, 41, 55, 0.25)'
  },
  landingLegendaryCloud: {
    position: 'absolute',
    inset: 0,
    zIndex: 0,
    pointerEvents: 'none'
  },
  landingLegendaryTile: {
    position: 'absolute',
    width: 140,
    height: 160,
    display: 'grid',
    placeItems: 'center',
    gap: 6,
    background: 'rgba(255, 255, 255, 0.35)',
    border: '2px solid rgba(31, 41, 55, 0.45)',
    borderRadius: 18,
    backdropFilter: 'blur(6px)',
    opacity: 0,
    animation: '$legendaryFade 18s ease-in-out infinite'
  },
  landingLegendaryTileImg: {
    width: 90,
    height: 90,
    objectFit: 'contain'
  },
  landingLegendaryTileText: {
    display: 'block',
    textTransform: 'capitalize',
    fontSize: 12,
    color: 'var(--play-ink)'
  },
  '@keyframes legendaryFade': {
    '0%': { opacity: 0, transform: 'translateY(10px) scale(0.95)' },
    '15%': { opacity: 0.9, transform: 'translateY(0) scale(1)' },
    '45%': { opacity: 0.9, transform: 'translateY(0) scale(1)' },
    '60%': { opacity: 0, transform: 'translateY(-10px) scale(0.95)' },
    '100%': { opacity: 0 }
  },
  tile1: { top: '12%', left: '10%', animationDelay: '0s' },
  tile2: { top: '18%', right: '14%', animationDelay: '2s' },
  tile3: { top: '55%', left: '12%', animationDelay: '4s' },
  tile4: { top: '62%', right: '10%', animationDelay: '6s' },
  tile5: { top: '35%', left: '42%', animationDelay: '8s' },
  tile6: { top: '8%', right: '35%', animationDelay: '10s' },
  tile7: { top: '70%', left: '38%', animationDelay: '12s' },
  tile8: { top: '28%', right: '42%', animationDelay: '14s' },
  tile9: { top: '40%', right: '4%', animationDelay: '16s' },
  tile10: { top: '78%', right: '32%', animationDelay: '1s' },
  tile11: { top: '46%', left: '4%', animationDelay: '3s' },
  tile12: { top: '22%', left: '26%', animationDelay: '5s' },
  tile13: { top: '52%', right: '26%', animationDelay: '7s' },
  tile14: { top: '82%', left: '18%', animationDelay: '9s' },
  tile15: { top: '12%', right: '52%', animationDelay: '11s' },
  tile16: { top: '60%', left: '58%', animationDelay: '13s' },
  tile17: { top: '32%', left: '70%', animationDelay: '15s' }
});
