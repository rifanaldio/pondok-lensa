import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../types/product';

export interface CartItem {
  product: Product;
  addedAt: string;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      // Check if product already exists in cart
      const existingItem = state.items.find(
        (item) => item.product.id === product.id
      );
      
      if (!existingItem) {
        state.items.push({
          product,
          addedAt: new Date().toISOString(),
        });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload
      );
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

