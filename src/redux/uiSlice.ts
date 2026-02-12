import { createSlice } from '@reduxjs/toolkit';

interface UiState {
  clearListSearchRequested: boolean;
}

const initialState: UiState = {
  clearListSearchRequested: false
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    requestClearListSearch: (state) => {
      state.clearListSearchRequested = true;
    },
    consumeClearListSearch: (state) => {
      state.clearListSearchRequested = false;
    }
  }
});

export const { requestClearListSearch, consumeClearListSearch } = uiSlice.actions;

export default uiSlice.reducer;
