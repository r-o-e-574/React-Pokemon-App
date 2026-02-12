export const pokemonText = {
  color: '#ffc94a',
  textShadow:
    '1.5px 1.5px 0 #2b6fdd, -1.5px -1.5px 0 #2b6fdd, 1.5px -1.5px 0 #2b6fdd, -1.5px 1.5px 0 #2b6fdd'
};

export const glassPanel = {
  background: 'rgba(255, 255, 255, 0.2)',
  border: '1px solid rgba(255, 255, 255, 0.7)',
  boxShadow: '0 10px 28px rgba(31, 41, 55, 0.12)',
  backdropFilter: 'blur(12px)'
};

export const uiLabel = {
  fontSize: 12,
  textTransform: 'uppercase',
  letterSpacing: 2,
  fontFamily: 'var(--ui-font)',
  color: 'var(--theme-ink-muted)'
};

export const uiLabelStrong = {
  fontSize: 12,
  textTransform: 'uppercase',
  letterSpacing: 2,
  fontFamily: 'var(--ui-font)',
  color: 'var(--theme-ink-strong)'
};

const shimmerDuration = '12s';
const shimmerSize = '300% 100%';
const shimmerStart = '0 0, 0 0';
const shimmerEnd = '-300% 0, 0 0';
const shimmerGradient =
  'linear-gradient(-45deg, rgba(255, 255, 255, 0.05) 40%, rgba(255, 255, 255, 0.34) 50%, rgba(255, 255, 255, 0.05) 60%)';

export const contentShimmerBase = {
  position: 'relative',
  overflow: 'hidden',
  background: `${shimmerGradient}, var(--theme-card-bg)`,
  backgroundRepeat: 'repeat-x, no-repeat',
  backgroundSize: `${shimmerSize}, 100% 100%`,
  backgroundPosition: shimmerStart,
  willChange: 'background-position-x',
  transition: 'background 240ms ease, border-color 240ms ease, color 240ms ease, box-shadow 240ms ease',
  animation: `$containerShimmer ${shimmerDuration} linear infinite`
};

export const contentShimmerKeyframes = {
  '@keyframes containerShimmer': {
    '100%': { backgroundPosition: shimmerEnd }
  }
};
