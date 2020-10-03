import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import lagReducer from './lagSlice'
const reducer = combineReducers({
  lag: lagReducer
})
const store = configureStore({
  reducer
})
export default store;