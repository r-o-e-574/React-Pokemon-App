import { createUseStyles } from 'react-jss';
import { contentShimmerBase, contentShimmerKeyframes, pokemonText } from './shared';

export const usePanelStyles = createUseStyles({
  panel: {
    ...contentShimmerBase,
    border: '1px solid var(--theme-border)',
    borderRadius: 18,
    position: 'relative',
    boxShadow: '0 10px 24px rgba(15, 23, 42, 0.16)',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    padding: 16
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12
  },
  title: {
    fontFamily: 'var(--pokemon-font)',
    fontSize: 20,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    ...pokemonText
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    minHeight: 0
  },
  ...contentShimmerKeyframes
});
