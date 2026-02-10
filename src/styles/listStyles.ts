import { createUseStyles } from 'react-jss';
import { glassPanel, pokemonText } from './shared';

export const useListStyles = createUseStyles({
  mainPage: {
    width: '100%',
    maxWidth: '100%',
    margin: '0 auto',
    padding: '20px 24px 48px',
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    alignItems: 'stretch',
    gap: 12,
    minHeight: 0,
    boxSizing: 'border-box'
  },
  mainColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    flex: 1,
    minWidth: 0,
    minHeight: 0,
    alignItems: 'stretch'
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    minHeight: 0,
    width: 420,
    flex: '0 0 420px',
    alignItems: 'stretch',
    overflow: 'visible'
  },
  mainPageFill: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, var(--theme-bg-1) 0%, var(--theme-bg-2) 45%, var(--theme-bg-3) 100%)',
    position: 'relative',
    height: '100vh',
    overflow: 'auto'
  },
  mainPageTiles: {
    position: 'absolute',
    inset: 0,
    backgroundImage:
      'linear-gradient(var(--grid-line, rgba(255, 255, 255, 0.2)) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line, rgba(255, 255, 255, 0.2)) 1px, transparent 1px)',
    backgroundSize: '64px 64px',
    opacity: 0.35,
    pointerEvents: 'none',
    zIndex: 0
  },
  mainLayer: {
    position: 'relative',
    zIndex: 1
  },
  mainHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16
  },
  mainHeaderBrand: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    background: 'var(--theme-card-bg)',
    border: '1px solid var(--theme-border)',
    borderRadius: 999,
    padding: '8px 14px',
    boxShadow: '0 8px 18px rgba(31, 41, 55, 0.12)',
    backdropFilter: 'blur(10px)',
    width: 'fit-content',
    maxWidth: '100%'
  },
  mainHeaderTitle: {
    margin: 0,
    fontSize: 28,
    fontFamily: 'Pokemon',
    ...pokemonText,
    textTransform: 'uppercase'
  },
  mainHeaderBall: {
    width: 46,
    height: 46
  },
  mainSearch: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    background: 'var(--theme-card-bg)',
    border: '1px solid var(--theme-border)',
    borderRadius: 16,
    padding: '10px 12px',
    boxShadow: '0 8px 18px rgba(31, 41, 55, 0.12)',
    backdropFilter: 'blur(10px)',
    width: '100%',
    boxSizing: 'border-box'
  },
  mainSearchLabel: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#f5f7ff',
    fontWeight: 600,
    textShadow: '0 1px 2px rgba(15, 23, 42, 0.35)',
    fontFamily: 'var(--ui-font)'
  },
  mainSearchInput: {
    border: '1px solid rgba(31, 41, 55, 0.25)',
    borderRadius: 12,
    padding: '10px 12px',
    fontFamily: 'var(--ui-font)',
    fontSize: 16,
    background: 'rgba(255, 255, 255, 0.95)',
    minWidth: 0,
    color: '#1f2a44',
    outline: 'none',
    '&:focus': {
      boxShadow: '0 0 0 3px rgba(255, 210, 79, 0.35)',
      borderColor: 'rgba(255, 210, 79, 0.8)'
    }
  },
  mainTopRow: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    gap: 14
  },
  listSection: {
    position: 'relative',
    zIndex: 1,
    overflow: 'hidden',
    minHeight: 0,
    height: '100%',
    flex: 1,
    display: 'flex',
    alignSelf: 'stretch'
  },
  listContainer: {
    ...glassPanel,
    background: 'var(--theme-card-bg)',
    border: '1px solid var(--theme-border)',
    borderRadius: 18,
    display: 'flex',
    flexDirection: 'column',
    height: '80vh',
    overflow: 'hidden',
    minHeight: 0
  },
  listTitle: {
    margin: 0,
    padding: '14px 16px 8px',
    fontSize: 26,
    textAlign: 'center',
    fontFamily: 'Pokemon',
    ...pokemonText,
    lineHeight: 1.1
  },
  listBody: {
    padding: '0 12px 12px',
    flex: 1,
    overflowY: 'auto',
    scrollbarColor: 'rgba(255, 255, 255, 0.45) rgba(15, 23, 42, 0.15)',
    scrollbarWidth: 'thin',
    '&::-webkit-scrollbar': {
      width: 10
    },
    '&::-webkit-scrollbar-track': {
      background: 'rgba(15, 23, 42, 0.15)',
      borderRadius: 999
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'rgba(255, 255, 255, 0.45)',
      borderRadius: 999,
      border: '2px solid rgba(15, 23, 42, 0.15)'
    }
  },
  pokeListContainer: {
    display: 'flex',
    alignItems: 'stretch',
    margin: 0,
    width: '100%',
    height: '100%',
    minHeight: 0
  },
  pokeCard: {
    ...glassPanel,
    background: 'var(--theme-card-bg)',
    padding: 10,
    borderRadius: 18,
    border: '1px solid var(--theme-border)',
    position: 'relative',
    overflow: 'hidden'
  },
  filterCard: {
    overflow: 'visible',
    padding: 10
  },
  pokeCardTitle: {
    margin: '0 0 8px 0',
    fontSize: 22,
    textAlign: 'center',
    fontFamily: 'Pokemon',
    ...pokemonText,
    lineHeight: 1.1
  },
  pokeListItems: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(220px, 1fr))',
    gap: 12
  },
  pokeListItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '12px 14px',
    borderRadius: 14,
    background: 'var(--theme-card-bg)',
    border: '1px solid var(--theme-border)',
    minHeight: 64
  },
  pokeSpriteButton: {
    border: 'none',
    background: 'transparent',
    padding: 2,
    cursor: 'pointer',
    borderRadius: 12
  },
  pokeListLink: {
    display: '-webkit-box',
    textTransform: 'capitalize',
    textDecoration: 'none',
    fontFamily: 'Pokemon',
    fontSize: 24,
    ...pokemonText,
    flex: 1,
    minWidth: 0,
    padding: '10px',
    whiteSpace: 'normal',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineHeight: 1.25,
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical'
  },
  pokeListSprite: {
    width: 82,
    height: 82,
    objectFit: 'contain'
  },
  pokeListSpritePlaceholder: {
    width: 82,
    height: 82,
    borderRadius: 12,
    background:
      'linear-gradient(135deg, rgba(255,255,255,0.75), rgba(255,255,255,0.25), rgba(255,255,255,0.75))',
    backgroundSize: '200% 200%',
    border: '1px solid var(--theme-border)',
    animation: '$skeletonPulse 1.4s ease-in-out infinite'
  },
  pokeFilterButtons: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center'
  },
  pokeButton: {
    fontFamily: 'Pokemon',
    textTransform: 'capitalize',
    border: 'none',
    padding: '8px 12px',
    borderRadius: 999,
    background: 'var(--theme-accent)',
    color: '#ffd58a',
    cursor: 'pointer'
  },
  pokeButtonAll: {
    background: 'var(--play-ink)'
  },
  pokeFeatured: {
    ...glassPanel,
    background: 'var(--theme-card-bg)',
    color: 'var(--play-ink)',
    padding: 12,
    borderRadius: 18,
    border: '1px solid var(--theme-border)',
    position: 'relative',
    overflow: 'hidden',
    flex: 1,
    minHeight: 260
  },
  pokeFeaturedShimmer: {
    position: 'absolute',
    inset: 0,
    background: 'rgba(15, 23, 42, 0.45)',
    transformOrigin: 'left',
    transform: 'scaleX(0)',
    animation: '$featuredProgress 9s linear infinite',
    pointerEvents: 'none',
    zIndex: 0
  },
  pokeFeaturedTitle: {
    position: 'relative',
    zIndex: 1
  },
  pokeFeaturedContent: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr auto',
    alignItems: 'center',
    gap: 16,
    position: 'relative',
    zIndex: 1,
    height: '90%'
  },
  pokeFeaturedCenter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'center'
  },
  pokeFeaturedSpriteButton: {
    border: 'none',
    background: 'transparent',
    padding: 0,
    margin: 0,
    cursor: 'pointer',
    borderRadius: 16
  },
  pokeFeaturedText: {
    minWidth: 0,
    textAlign: 'center'
  },
  pokeFeaturedSprite: {
    width: 170,
    height: 170,
    objectFit: 'contain'
  },
  pokeFeaturedName: {
    margin: 0,
    textTransform: 'capitalize',
    fontSize: 26,
    ...pokemonText,
    whiteSpace: 'normal',
    overflow: 'visible',
    textOverflow: 'clip',
    maxWidth: 'none',
    lineHeight: 1.1
  },
  pokeFeaturedLink: {
    color: '#2b6fdd',
    textDecoration: 'none',
    fontFamily: 'Pokemon',
    display: 'block',
    whiteSpace: 'normal',
    overflow: 'visible',
    textOverflow: 'clip',
    maxWidth: 'none'
  },
  pokeFeaturedNav: {
    fontFamily: 'Pokemon',
    textTransform: 'uppercase',
    border: 'none',
    padding: '8px 14px',
    borderRadius: 999,
    background: 'var(--theme-accent)',
    color: '#ffc94a',
    cursor: 'pointer',
    textShadow: '2px 2px 0 rgba(31, 41, 55, 0.25)',
    position: 'relative',
    zIndex: 2
  },
  filterControls: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 12,
    marginBottom: 8
  },
  filterGroup: {
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 8,
    alignItems: 'center'
  },
  filterLabel: {
    gridColumn: '1 / -1',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#f5f7ff',
    fontWeight: 600,
    textShadow: '0 1px 2px rgba(15, 23, 42, 0.35)',
    fontFamily: 'var(--ui-font)'
  },
  dropdownTrigger: {
    border: '1px solid rgba(31, 41, 55, 0.25)',
    borderRadius: 12,
    padding: '10px 12px',
    fontFamily: 'var(--ui-font)',
    background: 'rgba(255, 255, 255, 0.95)',
    color: '#1f2a44',
    textAlign: 'left',
    cursor: 'pointer',
    position: 'relative',
    outline: 'none',
    '&:focus': {
      boxShadow: '0 0 0 3px rgba(255, 210, 79, 0.35)',
      borderColor: 'rgba(255, 210, 79, 0.8)'
    }
  },
  dropdownMenu: {
    position: 'absolute',
    zIndex: 20,
    marginTop: 6,
    width: '100%',
    maxHeight: 220,
    overflowY: 'auto',
    borderRadius: 12,
    border: '1px solid var(--theme-border)',
    background: 'rgba(255,255,255,0.95)',
    boxShadow:
      '0 18px 40px rgba(15, 23, 42, 0.28), 0 6px 14px rgba(15, 23, 42, 0.18)',
    padding: 6
  },
  dropdownItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    width: '100%',
    border: 'none',
    background: 'transparent',
    padding: '8px 10px',
    borderRadius: 10,
    cursor: 'pointer',
    textTransform: 'capitalize',
    color: '#1f2a44',
    fontFamily: 'var(--ui-font)',
    '&:hover': {
      background: 'rgba(45, 108, 223, 0.12)'
    }
  },
  dropdownDot: {
    width: 12,
    height: 12,
    borderRadius: '50%',
    border: '1px solid rgba(31, 41, 55, 0.2)'
  },
  dropdownText: {
    flex: 1,
    textAlign: 'left'
  },
  filterChips: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
    minHeight: 34,
    maxHeight: 72,
    overflowY: 'auto',
    padding: '8px 10px',
    borderRadius: 14,
    background: 'rgba(255, 255, 255, 0.45)',
    border: '1px solid var(--theme-border)',
    scrollbarColor: 'rgba(255, 255, 255, 0.45) rgba(15, 23, 42, 0.15)',
    scrollbarWidth: 'thin',
    '&::-webkit-scrollbar': {
      height: 8,
      width: 8
    },
    '&::-webkit-scrollbar-track': {
      background: 'rgba(15, 23, 42, 0.15)',
      borderRadius: 999
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'rgba(255, 255, 255, 0.45)',
      borderRadius: 999,
      border: '2px solid rgba(15, 23, 42, 0.15)'
    }
  },
  filterChip: {
    border: '1px solid var(--theme-border)',
    background: 'rgba(255,255,255,0.65)',
    borderRadius: 999,
    padding: '6px 12px',
    fontFamily: 'var(--ui-font)',
    fontSize: 13,
    color: 'var(--play-ink)',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    textTransform: 'capitalize'
  },
  filterChipX: {
    fontSize: 16,
    lineHeight: 1,
    opacity: 0.7
  },
  '@keyframes featuredProgress': {
    '0%': { transform: 'scaleX(0)', opacity: 0.0 },
    '8%': { transform: 'scaleX(0.02)', opacity: 0.1 },
    '100%': { transform: 'scaleX(1)', opacity: 0.8 }
  },
  '@keyframes skeletonPulse': {
    '0%': { backgroundPosition: '0% 50%', opacity: 0.7 },
    '50%': { backgroundPosition: '100% 50%', opacity: 1 },
    '100%': { backgroundPosition: '0% 50%', opacity: 0.7 }
  },
  metallicEdge: {
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      inset: 0,
      borderRadius: 18,
      padding: 1,
      background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.2), rgba(255,255,255,0.9))',
      WebkitMask:
        'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
      WebkitMaskComposite: 'xor',
      maskComposite: 'exclude',
      opacity: 0.5,
      pointerEvents: 'none'
    }
  },
  '@media (max-width: 900px)': {
    mainPage: {
      gridTemplateColumns: '1fr'
    },
    rightColumn: {
      gridTemplateRows: 'auto auto auto'
    },
    filterControls: {
      gridTemplateColumns: '1fr'
    },
    pokeListItems: {
      gridTemplateColumns: 'repeat(2, minmax(220px, 1fr))'
    }
  },
  '@media (max-width: 640px)': {
    pokeListItems: {
      gridTemplateColumns: '1fr'
    }
  }
});
