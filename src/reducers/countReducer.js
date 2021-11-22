import { createSlice } from '@reduxjs/toolkit';

export const countSlice = createSlice({
  name: 'count',
  initialState: {
    value: 0,
  },
  reducers: {
    addCount: (state, action) => {
      state.value += action.payload;
    },
    minusCount: (state, action) => {
      state.value -= action.payload;
    },
  },
});

export const { addCount, minusCount } = countSlice.actions;
export default countSlice.reducer;