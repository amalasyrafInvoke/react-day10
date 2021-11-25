import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const submitLogin = createAsyncThunk(
  'user/login',
  async (userData, { getState, dispatch }) => {
    const { isLoading } = getState().user;

    if (isLoading !== 'pending') {
      return;
    }

    const response = await axios.post(
      'http://153f-49-124-200-218.ngrok.io/api/auth/login',
      {
        ...userData,
      }
    );
  
    return response.data;
  }
);

export const userReducer = createSlice({
  name: 'user',
  initialState: {
    userData: {},
    userToken: '',
    isAuthenticated: false,
    isLoading: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(submitLogin.pending, (state, action) => {
      if (state.isLoading === 'idle') {
        state.isLoading = 'pending';
      }
    }).addCase(submitLogin.fulfilled, (state, action) => {
      if (state.isLoading === 'pending') {
        state.isLoading = 'idle';
        state.userData = action.payload.user;
        state.isAuthenticated = true;
        state.userToken = action.payload.access_token;
      }
    });
    
  },
});

export const {} = userReducer.actions;
export default userReducer.reducer;
