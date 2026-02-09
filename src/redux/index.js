import { configureStore } from '@reduxjs/toolkit';
import filterTypeReducer from './filterTypeSlice';

const store = configureStore({
  reducer: {
    filterType: filterTypeReducer
  }
});

export default store;
