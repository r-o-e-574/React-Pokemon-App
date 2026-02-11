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

export const contentShimmerBase = {
  position: 'relative',
  overflow: 'hidden',
  background:
    'linear-gradient(135deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.18) 35%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0.18) 65%, rgba(255, 255, 255, 0) 100%), var(--theme-card-bg)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '300% 300%',
  backgroundPosition: '-150% -150%',
  animation: '$containerShimmer 12s linear infinite'
};

export const contentShimmerKeyframes = {
  '@keyframes containerShimmer': {
    '0%': { backgroundPosition: '-150% -150%' },
    '100%': { backgroundPosition: '150% 150%' }
  }
};
