export type TypeTheme = {
  bg1: string;
  bg2: string;
  bg3: string;
  accent: string;
  cardBg: string;
  border: string;
};

const defaultTheme: TypeTheme = {
  bg1: '#0f182e',
  bg2: '#1f2a48',
  bg3: '#2f3c63',
  accent: '#ffb6d5',
  cardBg: 'rgba(255, 255, 255, 0.14)',
  border: 'rgba(255, 255, 255, 0.6)'
};

const typeThemes: Record<string, TypeTheme> = {
  normal: {
    bg1: '#f3efe6',
    bg2: '#d9d1c5',
    bg3: '#bfb7aa',
    accent: '#AAB09F',
    cardBg: 'rgba(255,255,255,0.2)',
    border: 'rgba(255,255,255,0.7)'
  },
  fire: {
    bg1: '#ffe1d1',
    bg2: '#ffb884',
    bg3: '#ff915e',
    accent: '#EE8130',
    cardBg: 'rgba(255,255,255,0.18)',
    border: 'rgba(255,255,255,0.7)'
  },
  water: {
    bg1: '#d9ecff',
    bg2: '#a9d1ff',
    bg3: '#7fb2ff',
    accent: '#6390F0',
    cardBg: 'rgba(255,255,255,0.18)',
    border: 'rgba(255,255,255,0.7)'
  },
  electric: {
    bg1: '#fff7c8',
    bg2: '#ffe885',
    bg3: '#ffd34d',
    accent: '#F7D02C',
    cardBg: 'rgba(255,255,255,0.2)',
    border: 'rgba(255,255,255,0.7)'
  },
  grass: {
    bg1: '#e2f7d9',
    bg2: '#b8e8a6',
    bg3: '#8ed889',
    accent: '#7AC74C',
    cardBg: 'rgba(255,255,255,0.18)',
    border: 'rgba(255,255,255,0.7)'
  },
  ice: {
    bg1: '#e7fbff',
    bg2: '#c3f3ff',
    bg3: '#9be6ff',
    accent: '#96D9D6',
    cardBg: 'rgba(255,255,255,0.2)',
    border: 'rgba(255,255,255,0.7)'
  },
  fighting: {
    bg1: '#f2e3d5',
    bg2: '#d9b999',
    bg3: '#b88f6b',
    accent: '#C22E28',
    cardBg: 'rgba(255,255,255,0.18)',
    border: 'rgba(255,255,255,0.7)'
  },
  poison: {
    bg1: '#f2e0ff',
    bg2: '#d1b3ff',
    bg3: '#b087ff',
    accent: '#A33EA1',
    cardBg: 'rgba(255,255,255,0.18)',
    border: 'rgba(255,255,255,0.7)'
  },
  ground: {
    bg1: '#f6e4cc',
    bg2: '#e2c39a',
    bg3: '#caa06a',
    accent: '#E2BF65',
    cardBg: 'rgba(255,255,255,0.2)',
    border: 'rgba(255,255,255,0.7)'
  },
  flying: {
    bg1: '#e9f0ff',
    bg2: '#c8d6ff',
    bg3: '#a6bbff',
    accent: '#7DA6DE',
    cardBg: 'rgba(255,255,255,0.18)',
    border: 'rgba(255,255,255,0.7)'
  },
  psychic: {
    bg1: '#ffe1f0',
    bg2: '#ffb9dc',
    bg3: '#ff93c8',
    accent: '#F95587',
    cardBg: 'rgba(255,255,255,0.18)',
    border: 'rgba(255,255,255,0.7)'
  },
  bug: {
    bg1: '#eef7d6',
    bg2: '#d5e8a6',
    bg3: '#b9d87a',
    accent: '#A6B91A',
    cardBg: 'rgba(255,255,255,0.18)',
    border: 'rgba(255,255,255,0.7)'
  },
  rock: {
    bg1: '#f2e9d6',
    bg2: '#dbc8a4',
    bg3: '#c4a675',
    accent: '#B6A136',
    cardBg: 'rgba(255,255,255,0.2)',
    border: 'rgba(255,255,255,0.7)'
  },
  ghost: {
    bg1: '#e8e2ff',
    bg2: '#c6b6ff',
    bg3: '#a08dff',
    accent: '#735797',
    cardBg: 'rgba(255,255,255,0.18)',
    border: 'rgba(255,255,255,0.7)'
  },
  dragon: {
    bg1: '#e0e9ff',
    bg2: '#b8cbff',
    bg3: '#8fb0ff',
    accent: '#6A7BAF',
    cardBg: 'rgba(255,255,255,0.18)',
    border: 'rgba(255,255,255,0.7)'
  },
  dark: {
    bg1: '#14161b',
    bg2: '#1f232b',
    bg3: '#2b313b',
    accent: '#705848',
    cardBg: 'rgba(20, 24, 30, 0.46)',
    border: 'rgba(255,255,255,0.28)'
  },
  steel: {
    bg1: '#f1f4f8',
    bg2: '#d2d9e6',
    bg3: '#b6c1d6',
    accent: '#89A1B0',
    cardBg: 'rgba(255,255,255,0.2)',
    border: 'rgba(255,255,255,0.7)'
  },
  fairy: {
    bg1: '#ffe6f2',
    bg2: '#f9c7e0',
    bg3: '#f1a8cf',
    accent: '#D685AD',
    cardBg: 'rgba(255,255,255,0.2)',
    border: 'rgba(255,255,255,0.7)'
  }
};

export const getTypeTheme = (type?: string): TypeTheme => {
  if (!type) return defaultTheme;
  return typeThemes[type] ?? defaultTheme;
};
