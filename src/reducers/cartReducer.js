import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    lastUpdated: 'Never',
  },
  reducers: {
    addToCart: (state, action) => {
      const foundItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (foundItem) {
        const updatedData = state.items.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
        state.items = [...updatedData];
        state.lastUpdated = new Date().toString();
      } else {
        state.items = [...state.items, action.payload];
        state.lastUpdated = new Date().toString();
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    addQuantity: (state, action) => {
      const targetedItem = state.items.find(
        (item) => item.id === action.payload
      );
      if (targetedItem) {
        const updatedData = state.items.map((item) => {
          if (item.id === action.payload) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
        state.items = [...updatedData];
        state.lastUpdated = new Date().toString();
      }
    },
    minusQuantity: (state, action) => {
      const targetedItem = state.items.find(
        (item) => item.id === action.payload
      );
      if (targetedItem) {
        const updatedData = state.items.map((item) => {
          if (item.id === action.payload) {
            if (!(item.quantity - 1 <= 0)) {
              return { ...item, quantity: item.quantity - 1 };
            }
            return item;
          }
          return item;
        });
        state.items = [...updatedData];
        state.lastUpdated = new Date().toString();
      }
    },
  },
});

export const { addToCart, removeFromCart, addQuantity, minusQuantity } = cartSlice.actions;
export default cartSlice.reducer;
