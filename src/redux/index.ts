import { configureStore } from '@reduxjs/toolkit';
import filterTypeReducer from './filterTypeSlice';
import pokemonMediaReducer from './pokemonMediaSlice';
import { pokeApi } from './pokeApi';

const store = configureStore({
  reducer: {
    filterType: filterTypeReducer,
    pokemonMedia: pokemonMediaReducer,
    [pokeApi.reducerPath]: pokeApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(pokeApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
