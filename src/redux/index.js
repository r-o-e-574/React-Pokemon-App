import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import lagReducer from './lagSlice';
import filterTypeReducer from './filterTypeSlice';

const reducer = combineReducers({
  lag: lagReducer,
  filterType: filterTypeReducer
});

const store = configureStore({
  reducer
});

export default store;