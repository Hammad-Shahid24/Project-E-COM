import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/auth/authSlice";
import categoryReducer from "../redux/categories/categorySlice";
import productReducer from "../redux/products/productSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoryReducer,
    products: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "auth/initializeAuth/fulfilled",
          "auth/setUser",
          "product/fetchFilteredProducts/fulfilled",
          "tags/fetchAllTags/fulfilled",
          "categories/fetchAllCategories/fulfilled",
          "vouchers/fetchAllVouchers/fulfilled",
          "orders/fetchAllOrders/fulfilled",
        ],
        ignoredPaths: [
          "products.lastVisible",
          "products.discountStartDate",
          "products.discountExpiryDate",
          "tags.lastVisible",
          "tags.createdAt",
          "tags.updatedAt",
          "categories.lastVisible",
          "vouchers.lastVisible",
          "orders.lastVisible",
        ],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
