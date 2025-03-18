import { configureStore } from '@reduxjs/toolkit';
import medicationReducer from './features/medicationSlice';

export const store = configureStore({
  reducer: {
    medication: medicationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
