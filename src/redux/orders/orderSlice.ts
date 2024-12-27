import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '../../types/Shopping';
import { createOrder, fetchOrdersByUserId } from './orderService';

interface OrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null,
};

// Async thunk to create an order
export const createOrderThunk = createAsyncThunk(
  'orders/createOrder',
  async (order: Order, thunkAPI) => {
    try {
      const newOrder = await createOrder(order);
      return newOrder;
    } catch (error) {
      return thunkAPI.rejectWithValue(error instanceof Error ? error.message : String(error));
    }
  }
);

// Async thunk to fetch orders by user ID
export const fetchOrders = createAsyncThunk(
  'orders/fetchOrdersByUserId',
  async (userId: string, thunkAPI) => {
    try {
      const orders = await fetchOrdersByUserId(userId);
      return orders;
    } catch (error) {
      return thunkAPI.rejectWithValue(error instanceof Error ? error.message : String(error));
    }
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrderThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrderThunk.fulfilled, (state, action: PayloadAction<Order>) => {
        state.orders.push(action.payload);
        state.loading = false;
      })
      .addCase(createOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
     
  },
});

export default orderSlice.reducer;