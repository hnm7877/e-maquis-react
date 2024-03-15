import { combineReducers, configureStore } from '@reduxjs/toolkit';
import filters from './filters';

const reducer = combineReducers({
  filters,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
