import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/store/features/authSlice';
import employeeReducer from '@/store/features/EmployeeSlice';
export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      employee: employeeReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
