import { createSlice} from '@reduxjs/toolkit';

const filterTypeSlice = createSlice({
    name: 'filterType',
    initialState: '',
    reducers: {
        setFilterType: (_state, {payload}) => payload
    }
});

export const { setFilterType } = filterTypeSlice.actions;

export default filterTypeSlice.reducer