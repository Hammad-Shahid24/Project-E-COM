import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCartByUserId, addToCart, emptyCart, removeFromCart, updateProductQuantity } from "./cartService";
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

// Thunk to remove from cart
export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (
    { userId, productId }: { userId: string; productId: string },
    { rejectWithValue }
  ) => {
    console.log(productId)
    try {
      await removeFromCart(userId, productId);
      return productId; // Return removed product ID for local state update
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// // Thunk to reduce product quantity
// export const reduceQuantity = createAsyncThunk(
//   "cart/reduceQuantity",
//   async (
//     { userId, productId }: { userId: string; productId: string },
//     { rejectWithValue }
//   ) => {
//     try {
//       await reduceProductQuantity(userId, productId);
//       return productId; // Return product ID for UI update
//     } catch (error) {
//       return rejectWithValue((error as Error).message);
//     }
//   }
// );

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

// Thunk to update cart item quantity
export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async (
    { userId, productId, quantity }: { userId: string; productId: string; quantity: number },
    { rejectWithValue }
  ) => {
    try {
      await updateProductQuantity(userId, productId, quantity);
      return await fetchCartByUserId(userId);
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
      state.cart = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch cart
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
        state.error = action.payload as string;
      })
      // Add to cart
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
      // Remove from cart
      .addCase(removeCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.loading = false;
        if (state.cart) {
          state.cart.cartItems = state.cart.cartItems.filter(
            (item) => item.product.id !== action.payload
          );
          // Recalculate the cart total
          state.cart.total = state.cart.cartItems.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
          );
        }
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // // Reduce quantity
      // .addCase(reduceQuantity.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(reduceQuantity.fulfilled, (state, action) => {
      //   state.loading = false;
      //   if (state.cart) {
      //     const item = state.cart.cartItems.find(
      //       (item) => item.product.id === action.payload
      //     );
      //     if (item && item.quantity > 1) {
      //       item.quantity -= 1;
      //       state.cart.total = state.cart.cartItems.reduce(
      //         (sum, item) => sum + item.product.price * item.quantity,
      //         0
      //       );
      //     }
      //   }
      // })
      // .addCase(reduceQuantity.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload as string;
      // })
      // Clear cart
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
      })
      .addCase(updateQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.cart = action.payload;
      });

  },
});

export const { resetError, resetCart } = cartSlice.actions;

export default cartSlice.reducer;
