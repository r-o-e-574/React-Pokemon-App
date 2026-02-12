import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface PokemonMedia {
  sprite?: string;
  shiny?: string;
  cry?: string;
}

const loadInitialState = (): Record<string, PokemonMedia> => {
  try {
    const stored = localStorage.getItem('pokemonMedia');
    if (!stored) {
      return {};
    }
    const parsed = JSON.parse(stored) as Record<string, PokemonMedia>;
    return parsed ?? {};
  } catch {
    return {};
  }
};

const pokemonMediaSlice = createSlice({
  name: 'pokemonMedia',
  initialState: loadInitialState(),
  reducers: {
    mergePokemonMedia: (state, { payload }: PayloadAction<Record<string, PokemonMedia>>) => {
      Object.entries(payload).forEach(([name, media]) => {
        state[name] = { ...state[name], ...media };
      });
    },
    setPokemonMedia: (_state, { payload }: PayloadAction<Record<string, PokemonMedia>>) => payload
  }
});

export const { mergePokemonMedia, setPokemonMedia } = pokemonMediaSlice.actions;

export default pokemonMediaSlice.reducer;
