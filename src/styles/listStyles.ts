import { createUseStyles } from 'react-jss';
import {
  contentShimmerBase,
  contentShimmerKeyframes,
  glassPanel,
  pokemonText,
  uiLabel
} from './shared';
import naturePokemon from '../images/nature_pokemon.jpg';

export const useListStyles = createUseStyles({
  mainPage: {
    width: '100%',
    maxWidth: '100%',
    margin: '0 auto',
    padding: '0 24px 48px',
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'stretch',
    columnGap: 12,
    rowGap: 0,
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
  mainPageFill: {
    minHeight: '100dvh',
    background:
      'linear-gradient(rgba(15, 23, 42, 0.08), rgba(15, 23, 42, 0.08)), linear-gradient(135deg, var(--theme-bg-1) 0%, var(--theme-bg-2) 45%, var(--theme-bg-3) 100%)',
    position: 'relative',
    height: 'auto',
    overflowX: 'hidden',
    transition: 'background 240ms ease'
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
    padding: '0 4px 12px',
    backdropFilter: 'blur(6px)',
    width: '100%',
    flex: '0 0 100%'
  },
  mysteryButton: {
    border: '1px solid rgba(255, 255, 255, 0.7)',
    background:
      'radial-gradient(circle at top, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.55))',
    color: '#2b6fdd',
    fontFamily: 'var(--pokemon-font)',
    fontSize: 20,
    width: 44,
    height: 44,
    borderRadius: 999,
    boxShadow: '0 0 12px rgba(255, 210, 79, 0.45), 0 0 24px rgba(123, 92, 255, 0.35)',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    letterSpacing: 1,
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    '&:hover': {
      transform: 'translateY(-1px) scale(1.03)',
      boxShadow: '0 0 16px rgba(255, 210, 79, 0.6), 0 0 30px rgba(123, 92, 255, 0.45)'
    },
    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
      boxShadow: '0 0 10px rgba(255, 255, 255, 0.2)'
    }
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
    background: 'var(--theme-card-bg)',
    border: '1px solid var(--theme-border)',
    borderRadius: 16,
    marginTop: 4,
    padding: '10px 12px 14px',
    boxShadow: '0 8px 18px rgba(31, 41, 55, 0.12)',
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
  mysteryOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(8, 12, 24, 0.8)',
    zIndex: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24
  },
  mysteryModal: {
    background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.97), rgba(245, 249, 255, 0.95))',
    border: '1px solid var(--theme-border)',
    borderRadius: 20,
    padding: '24px 24px 28px',
    width: 'min(560px, 90vw)',
    boxShadow: '0 24px 60px rgba(15, 23, 42, 0.45)',
    position: 'relative',
    textAlign: 'center',
    backdropFilter: 'blur(6px)'
  },
  mysteryClose: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 999,
    border: '1px solid var(--theme-border)',
    background: 'rgba(255, 255, 255, 0.85)',
    color: '#1f2a44',
    cursor: 'pointer',
    fontSize: 18,
    lineHeight: 1,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mysteryTitle: {
    margin: '0 0 16px',
    fontFamily: 'var(--pokemon-font)',
    letterSpacing: 0.8,
    ...pokemonText,
    fontSize: 22
  },
  mysteryPokemon: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 16
  },
  mysterySprite: {
    width: 180,
    height: 180,
    objectFit: 'contain',
    filter: 'brightness(0) contrast(1) saturate(0)',
    transition: 'filter 0.3s ease'
  },
  mysteryReveal: {
    filter: 'brightness(1) contrast(1) saturate(1)'
  },
  mysteryOptions: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: 10
  },
  mysteryOption: {
    border: '1px solid var(--theme-border)',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.96), rgba(255, 255, 255, 0.7))',
    borderRadius: 14,
    padding: '10px 12px',
    fontFamily: 'var(--pokemon-font)',
    fontWeight: 700,
    letterSpacing: 1,
    textTransform: 'capitalize',
    color: '#ffc94a',
    textShadow:
      '2px 2px 0 #2b6fdd, -1.5px -1.5px 0 #2b6fdd, 2px -2px 0 #2b6fdd, -2px 2px 0 #2b6fdd',
    cursor: 'pointer',
    position: 'relative',
    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
    boxShadow: '0 8px 16px rgba(15, 23, 42, 0.18)',
    '&:disabled': {
      cursor: 'not-allowed',
      opacity: 0.7
    }
  },
  mysteryOptionSelected: {
    boxShadow: '0 6px 12px rgba(15, 23, 42, 0.2)',
    transform: 'translateY(-1px)'
  },
  mysteryOptionWrong: {
    borderColor: '#ef4444',
    color: '#7f1d1d',
    background: 'rgba(254, 226, 226, 0.9)',
    textDecoration: 'line-through',
    textDecorationThickness: '2px'
  },
  mysteryOptionCorrect: {
    borderColor: '#22c55e',
    background: 'rgba(236, 253, 245, 0.9)'
  },
  mysteryOptionMark: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    color: '#ef4444',
    fontWeight: 800,
    fontSize: 32,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.85,
    pointerEvents: 'none'
  },
  mysteryConfetti: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none'
  },
  mysteryConfettiPiece: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 8,
    height: 8,
    background: '#ffd24f',
    borderRadius: 2,
    transform: 'rotate(var(--confetti-angle)) translate(0, 0)',
    animation: '$mysteryConfetti 0.7s ease-out 3 forwards'
  },
  '@keyframes mysteryConfetti': {
    '0%': {
      transform: 'rotate(var(--confetti-angle)) translate(0, 0)',
      opacity: 1
    },
    '100%': {
      transform: 'rotate(var(--confetti-angle)) translate(0, -120px)',
      opacity: 0
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
    fontFamily: 'var(--pokemon-font)',
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
    fontFamily: 'var(--pokemon-font)',
    ...pokemonText,
    textTransform: 'uppercase'
  },
  mainHeaderBall: {
    width: 46,
    height: 46
  },
  mainSearchLabel: {
    ...uiLabel,
    fontWeight: 600,
    textShadow: '0 1px 2px rgba(15, 23, 42, 0.35)'
  },
  mainSearchInputRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 8
  },
  mainSearchInput: {
    flex: 1,
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
  mainSearchClear: {
    border: '1px solid var(--theme-border)',
    background: 'rgba(255, 255, 255, 0.9)',
    color: '#1f2a44',
    borderRadius: 999,
    padding: '6px 12px',
    fontFamily: 'var(--ui-font)',
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    boxShadow: '0 6px 14px rgba(15, 23, 42, 0.15)',
    transition: 'transform 0.15s ease, box-shadow 0.15s ease, filter 0.15s ease',
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: '0 10px 18px rgba(15, 23, 42, 0.2)'
    },
    '&:active': {
      transform: 'translateY(0)',
      boxShadow: '0 6px 14px rgba(15, 23, 42, 0.15)'
    }
  },
  featuredRow: {
    display: 'flex',
    gap: 12,
    alignItems: 'stretch',
    height: 300
  },
  greetingCard: {
    background: 'transparent',
    padding: '14px 16px 12px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 8,
    minHeight: 0,
    flex: '0 0 320px'
  },
  greetingTop: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  },
  greetingHello: {
    margin: 0,
    fontSize: 26,
    lineHeight: 1.05,
    fontFamily: 'var(--pokemon-font)',
    ...pokemonText,
    textTransform: 'capitalize',
    letterSpacing: 0.4
  },
  greetingTime: {
    margin: '2px 0 0',
    fontSize: 36,
    lineHeight: 1,
    fontFamily: 'var(--pokemon-font)',
    letterSpacing: 0.6,
    ...pokemonText,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '7px 14px',
    borderRadius: 999,
    border: '1px solid rgba(255, 230, 176, 0.45)',
    background: `linear-gradient(135deg, rgba(255, 214, 138, 0.28), rgba(255, 214, 138, 0.14)), url(${naturePokemon})`,
    backgroundSize: '155% 155%',
    backgroundPosition: 'center',
    boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.08), 0 10px 16px rgba(10, 12, 28, 0.3)',
    alignSelf: 'flex-start'
  },
  greetingTimeMorning: {
    backgroundImage: `linear-gradient(135deg, rgba(255, 152, 72, 0.55), rgba(255, 86, 88, 0.35)), url(${naturePokemon})`
  },
  greetingTimeDay: {
    backgroundImage: `linear-gradient(135deg, rgba(255, 214, 138, 0.35), rgba(255, 214, 138, 0.12)), url(${naturePokemon})`
  },
  greetingTimeDusk: {
    backgroundImage: `linear-gradient(135deg, rgba(255, 118, 64, 0.65), rgba(124, 70, 190, 0.5)), url(${naturePokemon})`
  },
  greetingTimeNight: {
    backgroundImage: `linear-gradient(135deg, rgba(52, 40, 130, 0.7), rgba(20, 14, 54, 0.55)), url(${naturePokemon})`
  },
  greetingMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    marginTop: 0,
    paddingTop: 0,
    flexWrap: 'wrap'
  },
  greetingTips: {
    marginTop: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    padding: '8px 10px',
    borderRadius: 12,
    border: '1px solid rgba(255, 255, 255, 0.28)',
    background: 'linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.08))',
    flexShrink: 0
  },
  greetingTipLabel: {
    margin: 0,
    ...uiLabel,
    fontSize: 12
  },
  greetingTip: {
    margin: 0,
    fontSize: 14,
    color: 'var(--theme-ink-strong)',
    fontFamily: 'var(--ui-font)',
    lineHeight: 1.3
  },
  greetingDate: {
    fontSize: 13,
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
    fontSize: 12,
    letterSpacing: 1.4,
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
    display: 'flex',
    flexDirection: 'column',
    height: 'clamp(360px, 56dvh, 760px)',
    width: '100%',
    flex: 1,
    overflow: 'hidden',
    minHeight: 0,
    boxShadow: 'none !important'
  },
  listTitle: {
    padding: '14px 16px 8px',
    fontSize: 26,
    textAlign: 'center',
    fontFamily: 'var(--pokemon-font)',
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
    padding: 10,
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
    fontFamily: 'var(--pokemon-font)',
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
    fontFamily: 'var(--pokemon-font)',
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
    boxShadow: '10px 6px 0 #7dd3fc, -8px 8px 0 #a78bfa, 4px -10px 0 #f97316, -10px -6px 0 #34d399',
    animation: '$sparklePop 0.5s ease-out'
  },
  pokeListSprite: {
    width: 82,
    height: 82,
    objectFit: 'contain'
  },
  pokeListSpriteFallback: {
    width: 82,
    height: 82,
    borderRadius: 12,
    border: '1px dashed var(--theme-border)',
    background: 'linear-gradient(135deg, rgba(255,255,255,0.72), rgba(255,255,255,0.38))',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    color: 'var(--theme-ink-muted)'
  },
  pokeListSpriteFallbackIcon: {
    fontFamily: 'var(--ui-font)',
    fontSize: 18,
    lineHeight: 1,
    fontWeight: 700
  },
  pokeListSpriteFallbackText: {
    fontFamily: 'var(--ui-font)',
    fontSize: 10,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    lineHeight: 1
  },
  pokeFeatured: {
    background: 'transparent',
    color: 'var(--play-ink)',
    padding: 12,
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    flex: 1,
    minHeight: 0
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
    paddingBottom: '10px'
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
  pokeFeaturedSingleRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: '1 1 auto',
    minWidth: 0
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
    fontFamily: 'var(--pokemon-font)',
    transition: 'transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease'
  },
  pokeFeaturedSingleCard: {
    minWidth: 130,
    maxWidth: 180
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
  pokeFeaturedNav: {
    fontFamily: 'var(--pokemon-font)',
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
    },
    '&:disabled': {
      cursor: 'not-allowed',
      opacity: 0.5,
      filter: 'grayscale(0.2)',
      transform: 'none',
      boxShadow: '0 4px 10px rgba(15, 23, 42, 0.12)'
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
    boxShadow: '0 18px 40px rgba(15, 23, 42, 0.28), 0 6px 14px rgba(15, 23, 42, 0.18)',
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
  '@keyframes sparklePop': {
    '0%': { transform: 'scale(0.6)', opacity: 0.9 },
    '100%': { transform: 'scale(1.2)', opacity: 0 }
  },
  '@keyframes skeletonPulse': {
    '0%': { backgroundPosition: '0% 50%', opacity: 0.7 },
    '50%': { backgroundPosition: '100% 50%', opacity: 1 },
    '100%': { backgroundPosition: '0% 50%', opacity: 0.7 }
  },
  contentShimmer: {
    ...contentShimmerBase
  },
  ...contentShimmerKeyframes,
  metallicEdge: {
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      inset: 0,
      borderRadius: 18,
      padding: 1,
      background:
        'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.2), rgba(255,255,255,0.9))',
      WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
      WebkitMaskComposite: 'xor',
      maskComposite: 'exclude',
      opacity: 0.5,
      pointerEvents: 'none'
    }
  },
  '@media (orientation: portrait)': {
    listContainer: {
      height: 'clamp(460px, 68dvh, 980px)'
    }
  },
  '@media (orientation: landscape)': {
    listContainer: {
      height: 'clamp(340px, 56dvh, 720px)'
    }
  },
  '@media (max-width: 1100px)': {
    mainPage: {
      flexDirection: 'column',
      padding: '0 16px 40px'
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
      flexDirection: 'row',
      alignItems: 'stretch',
      height: 'auto'
    },
    greetingCard: {
      height: 'auto',
      flex: '0 0 280px'
    },
    pokeFeatured: {
      height: 'auto',
      minWidth: 0,
      flex: '1 1 auto'
    },
    pokeFeaturedNav: {
      justifySelf: 'center'
    },
    pokeListItems: {
      gridTemplateColumns: 'repeat(2, minmax(180px, 1fr))'
    }
  },
  '@media (orientation: portrait) and (min-width: 1101px)': {
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
    pokeFeaturedContent: {
      height: '100%',
      gap: 12
    }
  },
  '@media (min-width: 768px) and (max-width: 1366px) and (orientation: portrait)': {
    mainPage: {
      padding: '0 14px 32px'
    },
    mainToolbar: {
      gap: 12,
      paddingBottom: 10
    },
    mainHeaderTitle: {
      fontSize: 24
    },
    featuredRow: {
      flexDirection: 'row',
      alignItems: 'stretch',
      height: 'auto',
      flexWrap: 'nowrap'
    },
    greetingCard: {
      flex: '0 0 280px',
      minHeight: 0,
      height: 'auto'
    },
    pokeFeatured: {
      minHeight: 0,
      flex: '1 1 auto'
    },
    listContainer: {
      height: 'clamp(520px, 62dvh, 1020px)'
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
