import { createUseStyles } from 'react-jss';
import { contentShimmerBase, contentShimmerKeyframes, uiLabel } from './shared';

export const usePokemonViewStyles = createUseStyles({
  pokeBackground: {
    display: 'flex',
    justifyContent: 'center',
    minHeight: '100dvh',
    height: '100dvh',
    padding: 'calc(env(safe-area-inset-top, 0px) + 8px) 16px 32px',
    background:
      'linear-gradient(rgba(15, 23, 42, 0.08), rgba(15, 23, 42, 0.08)), radial-gradient(circle at top, var(--theme-bg-1) 0%, var(--theme-bg-2) 50%, var(--theme-bg-3) 100%)',
    position: 'relative',
    transition: 'background 240ms ease',
    boxSizing: 'border-box',
    overflow: 'hidden'
  },
  pokeBackgroundTiles: {
    position: 'absolute',
    inset: 0,
    backgroundImage:
      'linear-gradient(var(--grid-line, rgba(255, 255, 255, 0.2)) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line, rgba(255, 255, 255, 0.2)) 1px, transparent 1px)',
    backgroundSize: '64px 64px',
    opacity: 0.35,
    pointerEvents: 'none',
    zIndex: 0
  },
  pokeBackgroundLayer: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minHeight: 0,
    width: '100%'
  },
  pokeDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    color: 'var(--theme-ink-strong)',
    width: '100%',
    flex: 1,
    minHeight: 0,
    overflow: 'hidden'
  },
  pokeTopRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: 40,
    flexShrink: 0
  },
  pokeScrollArea: {
    flex: 1,
    minHeight: 0,
    overflowY: 'auto',
    paddingBottom: 12,
    overscrollBehavior: 'contain',
    WebkitOverflowScrolling: 'touch'
  },
  pokeScrollContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    minHeight: 'max-content',
    '& > *': {
      flexShrink: 0
    }
  },
  pokeHeroCard: {
    display: 'grid',
    gridTemplateColumns: 'minmax(220px, 280px) 1fr',
    gap: 16,
    alignItems: 'center',
    flexShrink: 0
  },
  pokeHeroTopRight: {
    position: 'absolute',
    top: 16,
    right: 16
  },
  pokeName: {
    margin: 0,
    textTransform: 'capitalize',
    fontSize: 30,
    textAlign: 'center',
    width: '100%',
    color: '#ffc94a',
    textShadow:
      '2.5px 2.5px 0 #2b6fdd, -2px -2px 0 #2b6fdd, 2.5px -2.5px 0 #2b6fdd, -2.5px 2.5px 0 #2b6fdd',
    fontFamily: 'var(--pokemon-font)',
    letterSpacing: 1
  },
  pokeFact: {
    margin: 0,
    textAlign: 'left',
    fontSize: 16,
    textTransform: 'none',
    color: 'var(--theme-ink-strong)'
  },
  pokeFactStrong: {
    fontWeight: 700
  },
  pokeAbilityName: {
    textTransform: 'capitalize',
    fontWeight: 700
  },
  pokePlayButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    border: '1px solid var(--play-border, rgba(15, 23, 42, 0.18))',
    borderRadius: 999,
    background: 'var(--play-bg, #ffffff)',
    color: 'var(--play-ink, #111827)',
    padding: '5px 10px',
    cursor: 'pointer',
    width: 'fit-content',
    alignSelf: 'flex-start',
    fontFamily: 'var(--ui-font)',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 1,
    boxShadow: 'var(--play-shadow, 0 6px 12px rgba(15, 23, 42, 0.14))',
    transition:
      'transform 0.15s ease, box-shadow 0.15s ease, background 0.2s ease, border-color 0.2s ease',
    '&::before': {
      content: '">"',
      fontSize: 12,
      lineHeight: 1
    },
    '&:hover': {
      background: 'var(--play-bg-hover, #ffffff)',
      borderColor: 'var(--play-border-hover, var(--play-border, rgba(15, 23, 42, 0.18)))',
      transform: 'translateY(-1px)',
      boxShadow: 'var(--play-shadow-hover, 0 10px 16px rgba(15, 23, 42, 0.18))'
    },
    '&:active': {
      transform: 'translateY(0px)',
      boxShadow: '0 4px 10px rgba(15, 23, 42, 0.12)'
    },
    '&:disabled': {
      cursor: 'default',
      opacity: 0.5,
      boxShadow: 'none'
    }
  },
  pokeLink: {
    fontSize: 18,
    color: 'var(--theme-accent)',
    textShadow: 'none',
    textDecoration: 'none',
    alignSelf: 'flex-start'
  },
  pokeBackLink: {
    position: 'relative',
    width: 40,
    height: 40,
    borderRadius: 999,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    color: '#ffc94a',
    fontFamily: 'var(--pokemon-font)',
    fontSize: 18,
    letterSpacing: 0.5,
    textShadow: '1.5px 1.5px 0 #2b6fdd',
    background: 'var(--theme-card-bg)',
    border: '1px solid var(--theme-border)',
    boxShadow: '0 8px 16px rgba(15, 23, 42, 0.16)',
    zIndex: 5,
    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: '0 12px 20px rgba(15, 23, 42, 0.2)'
    }
  },
  '@media (max-width: 900px)': {
    pokeBackLink: {
      width: 36,
      height: 36
    },
    pokeBackArrow: {
      fontSize: 18
    },
    pokeBackground: {
      padding: 'calc(env(safe-area-inset-top, 0px) + 10px) 12px 20px'
    },
    pokeDetails: {
      gap: 12
    }
  },
  '@media (max-width: 700px) and (orientation: portrait)': {
    pokeHeroCard: {
      gridTemplateColumns: '1fr',
      textAlign: 'center'
    },
    pokeHeroTopRight: {
      position: 'static',
      marginLeft: 'auto'
    },
    pokeHeroActions: {
      justifyContent: 'center'
    },
    pokeMetaRow: {
      justifyContent: 'center'
    }
  },
  '@media (max-height: 820px)': {
    pokeName: {
      fontSize: 26
    }
  },
  pokeBackArrow: {
    fontSize: 20,
    lineHeight: 1
  },
  pokeImage: {
    width: 220,
    height: 220,
    objectFit: 'contain',
    justifySelf: 'center'
  },
  pokeImageShinyActive: {
    filter:
      'brightness(1.18) saturate(1.28) contrast(1.05) drop-shadow(0 0 18px rgba(255, 223, 124, 0.62))'
  },
  pokeImageFallback: {
    width: 220,
    height: 220,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: 16,
    borderRadius: 24,
    border: '1px dashed rgba(31, 41, 55, 0.3)',
    background: 'rgba(255, 255, 255, 0.55)',
    color: 'var(--theme-ink-strong)',
    fontFamily: 'var(--ui-font)',
    fontSize: 13,
    lineHeight: 1.4
  },
  pokeHeroText: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    fontFamily: 'var(--ui-font)'
  },
  pokeHeroActions: {
    display: 'flex',
    alignItems: 'center',
    gap: 15,
    flexWrap: 'wrap'
  },
  pokeCryButton: {
    width: 46,
    height: 46,
    borderRadius: 999,
    border: '1px solid var(--theme-border)',
    background: 'var(--theme-card-bg)',
    color: 'var(--theme-ink-strong)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 8px 16px rgba(15, 23, 42, 0.14)',
    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: '0 12px 20px rgba(15, 23, 42, 0.18)'
    },
    '&:active': {
      transform: 'translateY(0px)',
      boxShadow: '0 6px 14px rgba(15, 23, 42, 0.14)'
    }
  },
  pokeCryIcon: {
    width: 22,
    height: 22,
    display: 'block'
  },
  pokeHeroImageWrap: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    alignItems: 'center',
    position: 'relative'
  },
  pokeShinyToggle: {
    position: 'absolute',
    top: 6,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 999,
    border: '1px solid rgba(31, 41, 55, 0.2)',
    background:
      'radial-gradient(circle at 30% 25%, rgba(255, 255, 255, 0.98), rgba(255, 255, 255, 0.88) 58%, rgba(244, 248, 255, 0.9))',
    color: '#d19a00',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 0,
    padding: 0,
    cursor: 'pointer',
    boxShadow: '0 8px 18px rgba(15, 23, 42, 0.22), inset 0 0 0 1px rgba(255, 255, 255, 0.9)',
    transition:
      'transform 0.15s ease, box-shadow 0.15s ease, filter 0.15s ease, background 0.2s ease, border-color 0.2s ease',
    zIndex: 2,
    fontFamily: 'var(--ui-font)',
    fontSize: 11,
    letterSpacing: 1,
    textTransform: 'uppercase',
    '&:hover': {
      background:
        'radial-gradient(circle at 30% 25%, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.92) 58%, rgba(242, 246, 255, 0.92))',
      borderColor: 'rgba(31, 41, 55, 0.35)',
      transform: 'translateY(-1px)',
      boxShadow: '0 10px 20px rgba(15, 23, 42, 0.28)'
    },
    '&:active': {
      transform: 'translateY(0) scale(0.98)'
    }
  },
  pokeShinyToggleActive: {
    borderColor: 'rgba(182, 213, 255, 0.95)',
    background:
      'radial-gradient(circle at 30% 25%, rgba(255, 255, 255, 0.98), rgba(255, 255, 255, 0.88) 58%, rgba(244, 248, 255, 0.9))',
    boxShadow: '0 10px 20px rgba(15, 23, 42, 0.28), inset 0 0 0 1px rgba(255, 255, 255, 0.9)',
    filter: 'saturate(1.12)',
    '& $pokeShinySparkle': {
      color: '#2b6fdd'
    },
    '&:hover': {
      background:
        'radial-gradient(circle at 30% 25%, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.92) 58%, rgba(242, 246, 255, 0.92))',
      borderColor: 'rgba(196, 222, 255, 0.98)'
    }
  },
  pokeShinySparkle: {
    fontSize: 16,
    lineHeight: 1,
    color: '#ffc94a',
    textShadow: 'none'
  },
  pokeImageShinyFlash: {
    animation: '$shinyFlash 0.7s ease-out'
  },
  pokeImageShinyFadeDown: {
    animation: '$shinyFadeDown 0.55s ease-out'
  },
  pokeShinyTwinkle: {
    position: 'absolute',
    pointerEvents: 'none',
    color: '#ffe58a',
    textShadow: '0 0 16px rgba(255, 223, 124, 1), 0 0 28px rgba(255, 223, 124, 0.78)',
    opacity: 0.05,
    zIndex: 2
  },
  pokeShinyTwinkleOn: {
    animation: '$shinyTwinkle 0.7s ease-out both'
  },
  pokeShinyTwinkleOff: {
    color: '#8ad6ff',
    textShadow: '0 0 14px rgba(138, 214, 255, 0.95), 0 0 26px rgba(90, 158, 255, 0.74)',
    animation: '$shinyTwinkleDown 0.55s ease-out both'
  },
  pokeShinyTwinkleA: {
    top: 26,
    left: 30,
    fontSize: 20
  },
  pokeShinyTwinkleB: {
    bottom: 78,
    right: 34,
    fontSize: 16,
    animationDelay: '90ms'
  },
  pokeShinyTwinkleC: {
    top: 72,
    right: 18,
    fontSize: 14,
    animationDelay: '40ms'
  },
  pokeShinyTwinkleD: {
    bottom: 28,
    left: 28,
    fontSize: 18,
    animationDelay: '140ms'
  },
  pokeShinyTwinkleE: {
    top: 34,
    right: 52,
    fontSize: 15,
    animationDelay: '65ms'
  },
  pokeShinyTwinkleF: {
    bottom: 56,
    left: 64,
    fontSize: 17,
    animationDelay: '180ms'
  },
  pokeHeroBadges: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  pokeHeroInfoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: 12,
    width: '100%',
    paddingTop: 6
  },
  pokeHeroInfoBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6
  },
  pokeHeroInfoLabel: {
    margin: 0,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: 'var(--theme-ink-strong)'
  },
  pokeHeroInfoList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 6
  },
  pokeHeroInfoChip: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.6))',
    border: '1px solid rgba(255, 255, 255, 0.8)',
    borderRadius: 999,
    padding: '4px 10px',
    fontSize: 12,
    textTransform: 'capitalize',
    color: 'var(--theme-ink-strong)',
    boxShadow: '0 6px 10px rgba(15, 23, 42, 0.12), inset 0 0 0 1px rgba(255, 255, 255, 0.6)'
  },
  pokeHeroInfoChipLabel: {
    fontWeight: 700
  },
  pokeInfoRows: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16
  },
  pokeInfoRowPrimary: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 16,
    alignItems: 'stretch'
  },
  pokeInfoRowSecondary: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 16,
    alignItems: 'stretch',
    marginBottom: 8
  },
  pokeCardCompact: {
    padding: 14,
    flex: '1 1 0'
  },
  pokeCardStretch: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 0'
  },
  pokeSectionCard: {
    padding: 0,
    boxShadow: 'none'
  },
  pokeSectionTitle: {
    margin: 0
  },
  pokeSectionList: {
    margin: 0,
    paddingLeft: 18,
    textTransform: 'capitalize',
    fontFamily: 'var(--ui-font)',
    fontSize: 15
  },
  pokeStatItem: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 10
  },
  pokeStatName: {
    textTransform: 'capitalize'
  },
  pokeStatValue: {
    fontWeight: 700
  },
  pokeChipGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8
  },
  pokeChipRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8
  },
  pokeChip: {
    background: 'rgba(255, 255, 255, 0.85)',
    border: '1px solid var(--theme-border)',
    borderRadius: 999,
    padding: '4px 10px',
    fontSize: 13,
    textTransform: 'capitalize',
    fontFamily: 'var(--pokemon-font)',
    fontWeight: 500,
    color: 'var(--theme-ink-strong)',
    letterSpacing: 0.6,
    boxShadow: '0 2px 6px rgba(15, 23, 42, 0.12)',
    textShadow: '1px 1px 0 rgba(255, 255, 255, 0.7)'
  },
  pokeTypeChip: {
    color: '#fff',
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.35)'
  },
  pokeChipLabel: {
    fontWeight: 700,
    textTransform: 'uppercase',
    marginRight: 4
  },
  pokeMatchups: {
    display: 'grid',
    gap: 10
  },
  pokeMatchTitle: {
    margin: '0 0 6px 0',
    ...uiLabel,
    letterSpacing: 1
  },
  pokeWideCard: {
    gridColumn: '1 / -1',
    marginTop: 4
  },
  pokeEvolutionRow: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 28,
    rowGap: 14,
    padding: '4px 6px'
  },
  pokeEvolutionStageGroup: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: 14,
    minWidth: 220
  },
  pokeEvolutionLink: {
    textDecoration: 'none',
    color: 'inherit'
  },
  pokeEvolutionCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '8px 12px',
    borderRadius: 12,
    background: 'rgba(255, 255, 255, 0.55)',
    border: '1px solid var(--theme-border)',
    minWidth: 220,
    flex: '0 1 260'
  },
  pokeEvolutionArrow: {
    fontSize: 18,
    fontWeight: 700,
    color: 'var(--theme-ink-muted)',
    margin: '0 6px'
  },
  pokeEvolutionSprite: {
    width: 52,
    height: 52,
    objectFit: 'contain'
  },
  pokeEvolutionFallback: {
    width: 52,
    height: 52,
    borderRadius: 12,
    border: '1px dashed rgba(31, 41, 55, 0.28)',
    background: 'rgba(255, 255, 255, 0.65)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--theme-ink-strong)',
    fontFamily: 'var(--ui-font)',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.6
  },
  pokeEvolutionName: {
    margin: 0,
    fontWeight: 700,
    textTransform: 'capitalize',
    fontFamily: 'var(--pokemon-font)',
    color: 'var(--theme-ink-strong)',
    fontSize: 15
  },
  pokeEvolutionText: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 2
  },
  pokeEvolutionDetail: {
    margin: '2px 0 0',
    fontSize: 12,
    color: 'var(--theme-ink-muted)',
    fontFamily: 'var(--ui-font)'
  },
  pokeVarietyGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 22,
    rowGap: 12,
    padding: '4px 6px'
  },
  pokeVarietyLink: {
    textDecoration: 'none',
    color: 'inherit'
  },
  pokeVarietyCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '6px 10px',
    borderRadius: 10,
    background: 'rgba(255, 255, 255, 0.85)',
    border: '1px solid var(--theme-border)',
    minWidth: 180,
    flex: '0 1 220'
  },
  pokeVarietySprite: {
    width: 40,
    height: 40,
    objectFit: 'contain'
  },
  pokeVarietyFallback: {
    width: 40,
    height: 40,
    borderRadius: 10,
    border: '1px dashed rgba(31, 41, 55, 0.28)',
    background: 'rgba(255, 255, 255, 0.75)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--theme-ink-strong)',
    fontFamily: 'var(--ui-font)',
    fontSize: 9,
    textTransform: 'uppercase',
    letterSpacing: 0.6
  },
  pokeVarietyName: {
    textTransform: 'capitalize',
    fontSize: 14,
    fontWeight: 600,
    color: 'var(--theme-ink-strong)',
    fontFamily: 'var(--pokemon-font)',
    letterSpacing: 0.6,
    textShadow: '1px 1px 0 rgba(255, 255, 255, 0.7)'
  },
  contentShimmer: {
    ...contentShimmerBase
  },
  '@keyframes shinyFlash': {
    '0%': {
      filter: 'brightness(1) saturate(1)',
      transform: 'scale(1)'
    },
    '40%': {
      filter:
        'brightness(1.48) saturate(1.34) contrast(1.08) drop-shadow(0 0 22px rgba(255, 222, 124, 0.8))',
      transform: 'scale(1.03)'
    },
    '100%': {
      filter: 'brightness(1) saturate(1)',
      transform: 'scale(1)'
    }
  },
  '@keyframes shinyFadeDown': {
    '0%': {
      filter:
        'brightness(1.14) saturate(1.24) drop-shadow(0 0 16px rgba(255, 223, 124, 0.42)) drop-shadow(0 0 0 rgba(89, 164, 255, 0.0))',
      transform: 'scale(1.015)'
    },
    '45%': {
      filter:
        'brightness(0.98) saturate(1.04) drop-shadow(0 0 18px rgba(89, 164, 255, 0.6)) drop-shadow(0 0 28px rgba(138, 214, 255, 0.46))',
      transform: 'scale(1)'
    },
    '100%': {
      filter: 'brightness(1) saturate(1)',
      transform: 'scale(1)'
    }
  },
  '@keyframes shinyTwinkle': {
    '0%': {
      opacity: 0.2,
      transform: 'scale(0.6) translateY(6px)'
    },
    '35%': {
      opacity: 1,
      transform: 'scale(1.28) translateY(0)'
    },
    '100%': {
      opacity: 0,
      transform: 'scale(1.44) translateY(-10px)'
    }
  },
  '@keyframes shinyTwinkleDown': {
    '0%': {
      opacity: 0.62,
      transform: 'scale(0.95) translateY(-2px)'
    },
    '40%': {
      opacity: 0.92,
      transform: 'scale(1.18) translateY(3px)'
    },
    '100%': {
      opacity: 0,
      transform: 'scale(0.92) translateY(13px)'
    }
  },
  ...contentShimmerKeyframes,
  '@media (max-width: 700px)': {
    pokeInfoRowPrimary: {
      flexDirection: 'column'
    },
    pokeInfoRowSecondary: {
      flexDirection: 'column'
    },
    pokeHeroCard: {
      gridTemplateColumns: '1fr',
      textAlign: 'center'
    },
    pokeFact: {
      textAlign: 'center'
    }
  }
});
