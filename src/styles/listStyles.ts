import { createUseStyles } from 'react-jss';
import { glassPanel, pokemonText, uiLabel } from './shared';

export const useListStyles = createUseStyles({
  mainPage: {
    width: '100%',
    maxWidth: '100%',
    margin: '0 auto',
    padding: '20px 24px 48px',
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'stretch',
    gap: 12,
    minHeight: 0,
    boxSizing: 'border-box'
  },
  mainColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
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
    background:
      'linear-gradient(rgba(15, 23, 42, 0.08), rgba(15, 23, 42, 0.08)), linear-gradient(135deg, var(--theme-bg-1) 0%, var(--theme-bg-2) 45%, var(--theme-bg-3) 100%)',
    position: 'relative',
    height: '100vh',
    overflow: 'hidden'
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
  mainToolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    position: 'sticky',
    top: 0,
    zIndex: 5,
    padding: '8px 4px 12px',
    backdropFilter: 'blur(6px)',
    width: '100%',
    flex: '0 0 100%'
  },
  toolbarRight: {
    display: 'flex',
    alignItems: 'center',
    gap: 12
  },
  toolbarSearch: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    background:
      'linear-gradient(135deg, rgba(255, 255, 255, 0.28), rgba(255, 255, 255, 0.08)), var(--theme-card-bg)',
    border: '1px solid var(--theme-border)',
    borderRadius: 16,
    padding: '10px 12px 14px',
    boxShadow: '0 10px 20px rgba(31, 41, 55, 0.16)',
    backdropFilter: 'blur(10px)',
    width: 280,
    boxSizing: 'border-box'
  },
  filterToggleButton: {
    border: '1px solid var(--theme-border)',
    background: 'rgba(255, 255, 255, 0.92)',
    color: '#1f2a44',
    borderRadius: 999,
    width: 40,
    height: 40,
    padding: 0,
    fontFamily: 'var(--ui-font)',
    fontSize: 18,
    lineHeight: 1,
    cursor: 'pointer',
    boxShadow: '0 8px 18px rgba(31, 41, 55, 0.18)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: '0 12px 20px rgba(31, 41, 55, 0.22)'
    },
    '&:active': {
      transform: 'translateY(0)',
      boxShadow: '0 6px 14px rgba(31, 41, 55, 0.18)'
    }
  },
  filterDrawer: {
    position: 'fixed',
    left: 12,
    right: 12,
    top: 12,
    width: 'auto',
    maxHeight: 'calc(100vh - 24px)',
    ...glassPanel,
    background:
      'linear-gradient(135deg, rgba(15, 23, 42, 0.55), rgba(15, 23, 42, 0.35)), var(--theme-card-bg)',
    borderRadius: 18,
    border: '1px solid var(--theme-border)',
    boxShadow: '0 24px 40px rgba(10, 15, 30, 0.45)',
    padding: 14,
    transform: 'translateY(-110%)',
    transition: 'transform 0.22s ease',
    zIndex: 25,
    overflow: 'auto'
  },
  filterDrawerOpen: {
    transform: 'translateY(0%)'
  },
  rightPanelBackdrop: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(10, 15, 30, 0.35)',
    zIndex: 15
  },
  filterDrawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 10
  },
  filterDrawerTitle: {
    margin: 0,
    fontSize: 18,
    fontFamily: 'Pokemon',
    color: 'var(--theme-ink-strong)',
    letterSpacing: 0.6
  },
  filterDrawerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: 8
  },
  filterDrawerClose: {
    border: '1px solid rgba(255, 255, 255, 0.35)',
    background: 'rgba(255, 255, 255, 0.12)',
    color: 'var(--theme-ink-strong)',
    width: 32,
    height: 32,
    borderRadius: 999,
    cursor: 'pointer',
    fontSize: 18,
    lineHeight: 1
  },
  filterDrawerClear: {
    border: '1px solid rgba(255, 255, 255, 0.35)',
    background: 'rgba(255, 255, 255, 0.12)',
    color: 'var(--theme-ink-strong)',
    borderRadius: 999,
    padding: '6px 12px',
    fontFamily: 'var(--ui-font)',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    cursor: 'pointer',
    transition: 'filter 0.15s ease, opacity 0.15s ease',
    '&:not(:disabled)': {
      background: 'rgba(255, 255, 255, 0.2)',
      filter: 'brightness(1.05)'
    },
    '&:disabled': {
      opacity: 0.45,
      cursor: 'not-allowed'
    }
  },
  filterDrawerList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: 12
  },
  filterOption: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    background: 'rgba(15, 23, 42, 0.35)',
    borderRadius: 12,
    padding: '8px 10px',
    cursor: 'pointer',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: '0 8px 16px rgba(10, 14, 30, 0.35)'
    },
    '&:has(input:checked)': {
      boxShadow: '0 10px 18px rgba(10, 14, 30, 0.45)',
      borderColor: 'rgba(255, 255, 255, 0.35)'
    }
  },
  filterCheckbox: {
    position: 'absolute',
    opacity: 0,
    width: 1,
    height: 1,
    pointerEvents: 'none'
  },
  filterToggle: {
    width: 34,
    height: 20,
    borderRadius: 999,
    background: 'rgba(255, 255, 255, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.35)',
    position: 'relative',
    flex: '0 0 auto',
    boxShadow: 'inset 0 2px 6px rgba(10, 14, 30, 0.35)',
    transition: 'background 0.2s ease, border-color 0.2s ease',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 2,
      left: 2,
      width: 14,
      height: 14,
      borderRadius: 999,
      background: '#f8fafc',
      boxShadow: '0 4px 8px rgba(10, 14, 30, 0.35)',
      transition: 'transform 0.2s ease'
    },
    '$filterCheckbox:checked + &': {
      background: 'var(--type-accent, var(--theme-accent))',
      borderColor: 'rgba(255, 255, 255, 0.55)'
    },
    '$filterCheckbox:checked + &::after': {
      transform: 'translateX(14px)'
    }
  },
  filterTypeIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 999,
    background: 'rgba(15, 23, 42, 0.35)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 14px rgba(8, 12, 26, 0.5)',
    border: '1px solid rgba(8, 12, 26, 0.55)'
  },
  filterTypeIcon: {
    width: 22,
    height: 22,
    objectFit: 'contain',
    borderRadius: 999
  },
  filterOptionText: {
    color: 'var(--theme-ink-strong)',
    fontSize: 13,
    textTransform: 'capitalize',
    fontFamily: 'var(--ui-font)',
    textAlign: 'center'
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
    ...uiLabel,
    fontWeight: 600,
    textShadow: '0 1px 2px rgba(15, 23, 42, 0.35)'
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
  featuredRow: {
    display: 'flex',
    gap: 12,
    alignItems: 'stretch',
    height: 300
  },
  greetingCard: {
    ...glassPanel,
    background:
      'linear-gradient(135deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.05)), var(--theme-card-bg)',
    border: '1px solid var(--theme-border)',
    borderRadius: 18,
    padding: '18px 18px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    minHeight: 0,
    flex: '0 0 320px'
  },
  greetingTop: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    paddingLeft: 10,
    borderLeft: '3px solid rgba(255, 214, 138, 0.7)'
  },
  greetingHello: {
    margin: 0,
    fontSize: 19,
    fontFamily: 'var(--ui-font)',
    color: 'var(--theme-ink-strong)',
    letterSpacing: 0.2
  },
  greetingKicker: {
    margin: 0,
    ...uiLabel,
    fontSize: 13,
    letterSpacing: 2.4
  },
  greetingTime: {
    margin: 0,
    fontSize: 42,
    lineHeight: 1.05,
    fontFamily: 'Pokemon',
    color: '#ffe6b0',
    letterSpacing: 0.6,
    textShadow: '0 6px 18px rgba(10, 12, 28, 0.35)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 18px',
    borderRadius: 999,
    border: '1px solid rgba(255, 230, 176, 0.45)',
    background: 'rgba(15, 20, 40, 0.35)',
    boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.08), 0 10px 18px rgba(10, 12, 28, 0.32)'
  },
  greetingMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginTop: 6,
    flexWrap: 'wrap'
  },
  greetingTips: {
    marginTop: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 6
  },
  greetingTipLabel: {
    margin: 0,
    ...uiLabel,
    fontSize: 13
  },
  greetingTip: {
    margin: 0,
    fontSize: 16,
    color: 'var(--theme-ink-strong)',
    fontFamily: 'var(--ui-font)',
    lineHeight: 1.3
  },
  greetingDate: {
    fontSize: 15,
    color: 'var(--theme-ink-strong)',
    fontFamily: 'var(--ui-font)'
  },
  greetingDot: {
    width: 4,
    height: 4,
    borderRadius: 999,
    background: 'rgba(255, 213, 138, 0.85)'
  },
  greetingZone: {
    fontSize: 13,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: 'var(--theme-ink-muted)',
    fontFamily: 'var(--ui-font)'
  },
  listSection: {
    position: 'relative',
    zIndex: 1,
    overflow: 'hidden',
    minHeight: 0,
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
    height: '55vh',
    width: '100%',
    flex: 1,
    overflow: 'hidden',
    minHeight: 0
  },
  listTitle: {
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
  pokeListLinkWrap: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    minWidth: 0
  },
  pokeListSparkle: {
    position: 'absolute',
    right: -10,
    top: -4,
    width: 6,
    height: 6,
    borderRadius: 999,
    background: '#ffd24f',
    boxShadow:
      '10px 6px 0 #7dd3fc, -8px 8px 0 #a78bfa, 4px -10px 0 #f97316, -10px -6px 0 #34d399',
    animation: '$sparklePop 0.5s ease-out'
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
    width: '100%',
    flex: 1,
    minHeight: 0
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
    zIndex: 1,
    margin: 0,
    marginBottom: 'auto',
    padding: '2px 0',
    lineHeight: 1.2,
    overflow: 'visible',
    textAlign: 'center',
    width: '100%'
  },
  pokeFeaturedContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 8,
    position: 'relative',
    zIndex: 1,
    height: '100%',
    paddingBottom: "10px"
  },
  pokeFeaturedCenter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'center',
    flex: 1,
    minWidth: 0
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
    margin: '2px 0 0',
    textTransform: 'capitalize',
    fontSize: 26,
    ...pokemonText,
    whiteSpace: 'normal',
    overflow: 'visible',
    textOverflow: 'clip',
    maxWidth: 'none',
    lineHeight: 1.2,
    paddingBottom: 2
  },
  pokeFeaturedContentCarousel: {
    alignItems: 'center',
    gap: 10
  },
  pokeFeaturedCarouselRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    width: '100%',
    paddingBottom: '10px'
  },
  pokeFeaturedCarouselTrack: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    flex: '0 1 auto',
    justifyContent: 'center',
    minWidth: 0
  },
  pokeFeaturedCarouselCard: {
    ...glassPanel,
    border: '1px solid rgba(255, 255, 255, 0.2)',
    background: 'rgba(15, 23, 42, 0.35)',
    borderRadius: 16,
    padding: '10px 10px 8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 6,
    minWidth: 130,
    maxWidth: 180,
    cursor: 'pointer',
    color: 'rgba(255, 255, 255, 0.9)',
    fontFamily: 'Pokemon',
    transition: 'transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease'
  },
  pokeFeaturedCarouselActive: {
    background: 'rgba(255, 255, 255, 0.22)',
    borderColor: 'rgba(255, 255, 255, 0.65)',
    transform: 'scale(1.08)',
    boxShadow: '0 10px 24px rgba(15, 23, 42, 0.35)'
  },
  pokeFeaturedCarouselSprite: {
    width: 128,
    height: 128,
    objectFit: 'contain'
  },
  pokeFeaturedCarouselName: {
    fontSize: 14,
    textTransform: 'capitalize',
    textAlign: 'center',
    ...pokemonText
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
    padding: '8px 14px',
    borderRadius: 999,
    background: 'var(--play-bg, var(--theme-nav, var(--theme-accent)))',
    color: 'var(--play-ink, var(--theme-nav-ink, var(--theme-accent-ink, #1f2937)))',
    cursor: 'pointer',
    textShadow: '0 1px 2px rgba(15, 23, 42, 0.35)',
    position: 'relative',
    zIndex: 2,
    alignSelf: 'center',
    border: '1px solid var(--play-border, rgba(15, 23, 42, 0.28))',
    boxShadow: '0 8px 16px rgba(15, 23, 42, 0.2), inset 0 0 0 1px rgba(255, 255, 255, 0.35)',
    transition: 'transform 0.15s ease, box-shadow 0.15s ease, filter 0.15s ease',
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: '0 12px 18px rgba(15, 23, 42, 0.24), inset 0 0 0 1px rgba(255, 255, 255, 0.45)',
      filter: 'brightness(0.98) saturate(1.05)',
      background: 'var(--play-bg-hover, var(--play-bg, var(--theme-nav, var(--theme-accent))))',
      borderColor: 'var(--play-border-hover, var(--play-border, rgba(15, 23, 42, 0.28)))'
    },
    '&:active': {
      transform: 'translateY(0px)',
      boxShadow: '0 6px 12px rgba(15, 23, 42, 0.18), inset 0 0 0 1px rgba(255, 255, 255, 0.25)'
    }
  },
  filterControls: {
    display: 'grid',
    gridTemplateColumns: '1fr',
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
    ...uiLabel,
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
  '@keyframes sparklePop': {
    '0%': { transform: 'scale(0.6)', opacity: 0.9 },
    '100%': { transform: 'scale(1.2)', opacity: 0 }
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
  '@media (max-width: 1100px)': {
    mainPage: {
      flexDirection: 'column',
      padding: '16px 16px 40px'
    },
    rightColumn: {
      width: '100%',
      flex: '1 1 auto'
    },
    mainColumn: {
      order: 2
    },
    mainHeaderBrand: {
      alignSelf: 'center'
    },
    toolbarSearch: {
      width: 'min(360px, 70vw)'
    },
    filterDrawerList: {
      gridTemplateColumns: 'repeat(2, minmax(120px, 1fr))'
    },
    pokeFeaturedContent: {
      gridTemplateColumns: '1fr',
      height: 'auto',
      rowGap: 12
    },
    featuredRow: {
      flexDirection: 'column',
      height: 'auto'
    },
    greetingCard: {
      height: 'auto'
    },
    pokeFeatured: {
      height: 'auto'
    },
    pokeFeaturedNav: {
      justifySelf: 'center'
    },
    listContainer: {
      height: 'clamp(320px, 42vh, 520px)'
    },
    pokeListItems: {
      gridTemplateColumns: 'repeat(2, minmax(180px, 1fr))'
    }
  },
  '@media (orientation: portrait)': {
    featuredRow: {
      flexDirection: 'row',
      height: 280
    },
    greetingCard: {
      minHeight: 120,
      padding: '14px 16px',
      flex: '0 0 280px'
    },
    pokeFeatured: {
      minHeight: 200
    },
    pokeFeaturedSprite: {
      width: 140,
      height: 140
    },
    pokeFeaturedContent: {
      height: '100%',
      gap: 12
    },
    listContainer: {
      height: 'calc(70vh - 30px)'
    }
  },
  '@media (max-width: 640px)': {
    filterDrawerList: {
      gridTemplateColumns: '1fr'
    },
    pokeListItems: {
      gridTemplateColumns: '1fr'
    },
    mainHeaderTitle: {
      fontSize: 22
    },
    mainHeaderBall: {
      width: 38,
      height: 38
    },
    toolbarRight: {
      width: '100%',
      flexDirection: 'column',
      alignItems: 'stretch'
    },
    toolbarSearch: {
      width: '100%'
    }
  }
});
