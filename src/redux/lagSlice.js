import { createSlice} from '@reduxjs/toolkit';

const lagSlice = createSlice({
    name: 'lag',
    initialState: false,
    reducers: {
        toggle: state => !state
    }
});

export const { toggle } = lagSlice.actions;

export default lagSlice.reducer