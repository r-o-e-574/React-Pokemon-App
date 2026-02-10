import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const filterTypeSlice = createSlice({
  name: 'filterType',
  initialState: '' as string,
  reducers: {
    setFilterType: (_state, { payload }: PayloadAction<string>) => payload
  }
});

export const { setFilterType } = filterTypeSlice.actions;

export default filterTypeSlice.reducer;
