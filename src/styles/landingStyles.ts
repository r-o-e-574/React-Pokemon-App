import { createUseStyles } from 'react-jss';
import { pokemonText } from './shared';

export const useLandingStyles = createUseStyles({
  landingRoot: {
    minHeight: '100vh',
    display: 'grid',
    placeItems: 'center',
    background: 'linear-gradient(135deg, #0f182e 0%, #1f2a48 45%, #2f3c63 100%)',
    position: 'relative',
    overflow: 'hidden',
    '--theme-ink-strong': '#f8fafc',
    '--theme-ink-muted': 'rgba(248, 250, 252, 0.72)'
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
    background:
      'radial-gradient(circle at 30% 30%, rgba(76, 110, 255, 0.45), transparent 60%), radial-gradient(circle at 70% 60%, rgba(255, 187, 92, 0.35), transparent 55%)',
    top: -400,
    left: '50%',
    transform: 'translateX(-50%)',
    opacity: 0.5
  },
  landingBackdropGlow: {
    position: 'absolute',
    width: 900,
    height: 900,
    borderRadius: '50%',
    background:
      'radial-gradient(circle, rgba(88, 118, 255, 0.35) 0%, rgba(88, 118, 255, 0) 60%)',
    bottom: -420,
    right: -260,
    opacity: 0.6,
    filter: 'blur(6px)'
  },
  landingHeader: {
    position: 'absolute',
    top: 28,
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 6,
    textAlign: 'center',
    padding: '10px 20px 12px',
    borderRadius: 16,
    background: 'rgba(15, 16, 38, 0.55)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 12px 28px rgba(10, 12, 28, 0.35)',
    backdropFilter: 'blur(6px)'
  },
  landingHeaderTitle: {
    fontFamily: 'Pokemon',
    fontSize: 44,
    letterSpacing: 2,
    ...pokemonText,
    textTransform: 'uppercase'
  },
  landingHeaderSub: {
    fontFamily: 'var(--ui-font)',
    fontSize: 14,
    letterSpacing: 2.4,
    textTransform: 'uppercase',
    color: 'var(--theme-ink-muted)'
  },
  landingHeaderTagline: {
    margin: 0,
    fontFamily: 'var(--ui-font)',
    fontSize: 16,
    color: 'var(--theme-ink-strong)',
    letterSpacing: 0.4
  },
  landingCta: {
    position: 'relative',
    zIndex: 1,
    marginTop: 220,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    padding: '12px 20px 16px',
    borderRadius: 16,
    background: 'rgba(15, 16, 38, 0.4)',
    border: '1px solid rgba(255, 255, 255, 0.16)',
    boxShadow: '0 12px 24px rgba(10, 12, 28, 0.25)',
    backdropFilter: 'blur(6px)'
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
    textShadow: '2.5px 2.5px 0 rgba(31, 41, 55, 0.25)',
    transition: 'transform 0.18s ease, box-shadow 0.18s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 16px 30px rgba(31, 41, 55, 0.28)'
    },
    '&:active': {
      transform: 'scale(1.08)',
      boxShadow: '0 18px 36px rgba(31, 41, 55, 0.3)'
    },
    '&:focus': {
      outline: 'none'
    },
    '&:focus-visible': {
      outline: '3px solid rgba(255, 210, 79, 0.85)',
      outlineOffset: 4
    },
    animation: '$pressPulse 2.2s ease-in-out infinite'
  },
  landingStartPop: {
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      inset: -10,
      borderRadius: 999,
      border: '2px solid rgba(255, 255, 255, 0.7)',
      animation: '$bubbleRing 0.5s ease-out',
      opacity: 0
    }
  },
  landingStartHint: {
    fontFamily: 'var(--ui-font)',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 2.2,
    color: 'var(--theme-ink-muted)',
    animation: '$hintBlink 2.4s ease-in-out infinite'
  },
  landingConfetti: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    overflow: 'visible'
  },
  confettiPiece: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    width: 8,
    height: 8,
    borderRadius: 3,
    background: 'var(--confetti-color, #ffd24f)',
    transform: 'translate(-50%, -50%)',
    animation: '$confettiPop 0.7s ease-out forwards'
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
    background: 'rgba(255, 255, 255, 0.26)',
    border: '2px solid rgba(255, 255, 255, 0.35)',
    borderRadius: 18,
    backdropFilter: 'blur(6px)',
    opacity: 0,
    boxShadow: '0 12px 22px rgba(10, 14, 35, 0.35)',
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
    color: 'var(--theme-ink-strong)',
    letterSpacing: 0.3
  },
  '@keyframes legendaryFade': {
    '0%': { opacity: 0, transform: 'translateY(10px) scale(0.95)' },
    '15%': { opacity: 0.9, transform: 'translateY(0) scale(1)' },
    '45%': { opacity: 0.9, transform: 'translateY(0) scale(1)' },
    '60%': { opacity: 0, transform: 'translateY(-10px) scale(0.95)' },
    '100%': { opacity: 0 }
  },
  '@keyframes pressPulse': {
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.04)' },
    '100%': { transform: 'scale(1)' }
  },
  '@keyframes bubbleRing': {
    '0%': { transform: 'scale(0.7)', opacity: 0.8 },
    '100%': { transform: 'scale(1.25)', opacity: 0 }
  },
  '@keyframes confettiPop': {
    '0%': { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
    '100%': {
      transform: 'translate(calc(-50% + var(--x)), calc(-50% + var(--y))) rotate(var(--r)) scale(0.9)',
      opacity: 0
    }
  },
  '@keyframes hintBlink': {
    '0%': { opacity: 0.6 },
    '50%': { opacity: 1 },
    '100%': { opacity: 0.6 }
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
