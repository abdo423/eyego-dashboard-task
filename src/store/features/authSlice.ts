import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type User = {
  id: number;
  email: string;
  username: string;
};

type AuthState = {
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  token: null,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    loginSuccess(state, action: PayloadAction<{ token: string; user: User }>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.loading = false;
      state.error = null;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.token = null;
      state.user = null;
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.token = null;
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setLoading, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
