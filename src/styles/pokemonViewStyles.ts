import { createUseStyles } from 'react-jss';
import { uiLabel } from './shared';

export const usePokemonViewStyles = createUseStyles({
  pokeBackground: {
    display: 'flex',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '32px 16px',
    background:
      'linear-gradient(rgba(15, 23, 42, 0.08), rgba(15, 23, 42, 0.08)), radial-gradient(circle at top, var(--theme-bg-1) 0%, var(--theme-bg-2) 50%, var(--theme-bg-3) 100%)',
    position: 'relative'
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
    zIndex: 1
  },
  pokeDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    color: 'var(--play-ink)',
    width: 'min(1100px, 100%)'
  },
  pokeHeroCard: {
    display: 'grid',
    gridTemplateColumns: 'minmax(260px, 320px) 1fr',
    gap: 20,
    alignItems: 'center',
    background: 'var(--theme-card-bg)',
    borderRadius: 18,
    border: '1px solid var(--theme-border)',
    padding: 20,
    boxShadow: '0 10px 24px rgba(15, 23, 42, 0.18)',
    position: 'relative'
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
    color: '#ffc94a',
    textShadow:
      '2.5px 2.5px 0 #2b6fdd, -2px -2px 0 #2b6fdd, 2.5px -2.5px 0 #2b6fdd, -2.5px 2.5px 0 #2b6fdd',
    fontFamily: 'Pokemon',
    letterSpacing: 1
  },
  pokeFact: {
    margin: 0,
    textAlign: 'left',
    fontSize: 16,
    textTransform: 'none',
    color: 'var(--play-ink)'
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
    transition: 'transform 0.15s ease, box-shadow 0.15s ease, background 0.2s ease, border-color 0.2s ease',
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
    position: 'fixed',
    top: 16,
    left: 16,
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    textDecoration: 'none',
    color: '#ffc94a',
    fontFamily: 'Pokemon',
    fontSize: 20,
    letterSpacing: 1,
    textShadow: '2px 2px 0 #2b6fdd',
    zIndex: 5
  },
  pokeBackArrow: {
    fontSize: 22,
    lineHeight: 1
  },
  pokeSpeechOverlay: {
    position: 'fixed',
    right: 20,
    bottom: 20,
    display: 'flex',
    alignItems: 'flex-end',
    gap: 16,
    zIndex: 20,
    maxWidth: 420
  },
  pokeSpeechFrame: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 0,
    padding: 12,
    borderRadius: 22,
    border: '2px solid rgba(43, 63, 99, 0.4)',
    backgroundColor: 'rgba(245, 255, 238, 0.9)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    boxShadow: '0 16px 30px rgba(15, 23, 42, 0.22)',
    position: 'relative'
  },
  pokeSpeechAvatar: {
    width: 64,
    height: 64,
    borderRadius: 16,
    background: 'rgba(255, 255, 255, 0.9)',
    border: '1px solid var(--theme-border)',
    display: 'grid',
    placeItems: 'center',
    fontFamily: 'Pokemon',
    color: '#2b3f63',
    fontSize: 18
  },
  pokeSpeechImage: {
    width: 150,
    height: 160,
    objectFit: 'cover',
    borderRadius: 18,
    border: 'none',
    boxShadow: '0 10px 22px rgba(15, 23, 42, 0.2)',
    background: 'transparent'
  },
  pokeSpeechBubble: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.96), rgba(233, 249, 226, 0.92))',
    border: '2px solid rgba(43, 63, 99, 0.35)',
    borderRadius: 18,
    padding: '12px 14px',
    boxShadow: '0 12px 26px rgba(15, 23, 42, 0.2)',
    fontFamily: 'var(--ui-font)',
    textAlign: 'left',
    minWidth: 220,
    marginTop: -6
  },
  pokeSpeechClose: {
    position: 'absolute',
    top: 8,
    right: 8,
    border: '1px solid rgba(43, 63, 99, 0.35)',
    background: 'rgba(255, 255, 255, 0.9)',
    color: '#2b3f63',
    borderRadius: 999,
    padding: '4px 8px',
    fontFamily: 'var(--ui-font)',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
    cursor: 'pointer'
  },
  pokeSpeechTitle: {
    margin: 0,
    ...uiLabel,
    letterSpacing: 1
  },
  pokeSpeechText: {
    margin: '4px 0 0',
    fontSize: 15,
    color: 'var(--play-ink)',
    textTransform: 'capitalize'
  },
  pokeImage: {
    width: 260,
    height: 260,
    objectFit: 'contain',
    justifySelf: 'center'
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
  pokeHeroImageWrap: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    alignItems: 'center'
  },
  pokeHeroBadges: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  pokeMetaRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px 12px',
    fontSize: 14,
    color: 'var(--theme-ink-strong)'
  },
  pokeMeta: {
    background: 'rgba(255, 255, 255, 0.6)',
    border: '1px solid var(--theme-border)',
    borderRadius: 999,
    padding: '4px 10px'
  },
  pokeInfoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: 16
  },
  pokeSectionCard: {
    background: 'var(--theme-card-bg)',
    border: '1px solid var(--theme-border)',
    borderRadius: 16,
    padding: 16,
    boxShadow: '0 8px 20px rgba(15, 23, 42, 0.16)'
  },
  pokeSectionTitle: {
    margin: '0 0 8px 0',
    fontSize: 18,
    fontWeight: 700,
    color: 'var(--theme-ink-strong)',
    letterSpacing: 1,
    textTransform: 'uppercase',
    fontFamily: 'var(--ui-font)'
  },
  pokeSectionHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 8
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
    fontFamily: 'Pokemon',
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
    gridColumn: '1 / -1'
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
  pokeEvolutionName: {
    margin: 0,
    fontWeight: 700,
    textTransform: 'capitalize',
    fontFamily: 'Pokemon',
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
    color: 'rgba(31, 41, 55, 0.8)',
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
  pokeVarietyName: {
    textTransform: 'capitalize',
    fontSize: 14,
    fontWeight: 600,
    color: '#2b3f63',
    fontFamily: 'Pokemon',
    letterSpacing: 0.6,
    textShadow: '1px 1px 0 rgba(255, 255, 255, 0.7)'
  },
  '@media (max-width: 720px)': {
    pokeHeroCard: {
      gridTemplateColumns: '1fr',
      textAlign: 'center'
    },
    pokeFact: {
      textAlign: 'center'
    },
    pokeInfoGrid: {
      gridTemplateColumns: '1fr'
    }
  }
});
