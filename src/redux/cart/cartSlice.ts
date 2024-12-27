import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCartByUserId, addToCart, emptyCart } from "./cartService";
import { Cart, Product } from "../../types/Shopping";

interface CartState {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cart: null,
  loading: false,
  error: null,
};

// Thunk to fetch cart
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (userId: string, { rejectWithValue }) => {
    try {
      return await fetchCartByUserId(userId);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Thunk to add to cart
export const addCartItem = createAsyncThunk(
  "cart/addCartItem",
  async (
    { userId, product, quantity }: { userId: string; product: Product; quantity: number },
    { rejectWithValue }
  ) => {
    try {
      return await addToCart(userId, product, quantity);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Thunk to empty cart
export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (userId: string, { rejectWithValue }) => {
    try {
      await emptyCart(userId);
      return null;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetError(state) {
      state.error = null;
    },
    resetCart(state) {
      state.cart = null
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.error = action.payload as string;
      })
      .addCase(addCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(addCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.loading = false;
        state.cart = null;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetError, resetCart } = cartSlice.actions;

export default cartSlice.reducer;
