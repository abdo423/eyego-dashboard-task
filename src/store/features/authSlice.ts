import { createSlice, PayloadAction } from '@reduxjs/toolkit';
const userSchema = {
  id: Number,
  email: String,
  password: String,
  username: String,
};
type AuthState = { token: string | null; user: typeof userSchema | null };
const initialState: AuthState = {
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ token: string; user: typeof userSchema }>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem('token', action.payload.token);
    },
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
    },
  },
});
export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
