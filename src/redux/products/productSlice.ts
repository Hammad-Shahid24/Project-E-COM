import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSingleProductById, fetchProducts, getFilteredProducts } from "./productService";
import { Product } from "../../types/Shopping";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

// Define the initial state using the Product type
interface ProductState {
  products: Product[];
  product: Product | null;
  loading: boolean;
  error: string | null;
  lastVisible: null | QueryDocumentSnapshot<Product, DocumentData>; // Store only the last visible document ID
  totalProducts: number | null;
}

const initialState: ProductState = {
  products: [],
  product: null,
  loading: false,
  error: null,
  lastVisible: null, // Store the last visible ID, not the full document
  totalProducts: null,
};

// Fetch products
export const fetchAllProducts = createAsyncThunk(
  "product/fetchAllProducts",
  async (
    {
      pageSize,
      sortField = "createdAt",
      sortOrder = "desc",
      categoryId,
    }: { pageSize: number; sortField?: string; sortOrder?: "asc" | "desc", categoryId: string },
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as { products: ProductState };
      const lastVisible = state.products.lastVisible;

      // Call fetchProducts with lastVisible and pageSize
      const {
        products,
        lastVisible: updatedLastVisible,
        totalProducts,
      } = await fetchProducts(lastVisible, categoryId, sortField, sortOrder, pageSize);

      // Return products and the updated lastVisible value
      return {
        products,
        lastVisible: updatedLastVisible,
        totalProducts,
      };
    } catch (error: any) {
      // Catch any error and provide a more informative message
      let errorMessage = "An error occurred while fetching products.";
      if (error instanceof Error) {
        errorMessage = error.message; // If it's an instance of Error, use the message
      } else if (typeof error === "string") {
        errorMessage = error; // If it's a string, just use it directly
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchFilteredProducts = createAsyncThunk(
  "product/fetchFilteredProducts",
  async (
    {
      filters,
    }: {
      filters: {
        categoryId?: string;
        tags?: string[];
      };
    },
    { rejectWithValue }
  ) => {
    try {


      // Fetch filtered products using service function
      const { products, totalProducts } =
        await getFilteredProducts(
          filters,
        );

      return { products, totalProducts };
    } catch (error: any) {
      let errorMessage = "An error occurred while fetching filtered products.";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchById',
  async (productId: string, thunkAPI) => {
    try {
      const response = await fetchSingleProductById(productId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch product');
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetState: (state) => {
      state.products = [];
      state.loading = false;
      state.error = null;
      state.lastVisible = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setProductById: (state, action) => {
      state.product =
        state.products.find((product) => product.id === action.payload) ?? null;
    },
    resetProduct: (state) => {
      state.product = null;
    },
    resetProducts: (state) => {
      state.products = [];
      state.lastVisible = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        // Filter out duplicates by ID
        const newProducts = action.payload.products.filter(
          (newProduct: Product) =>
            !state.products.some((product) => product.id === newProduct.id)
        );

        // Add unique products to state
        state.products = state.products.concat(newProducts);
        state.lastVisible = action.payload.lastVisible as QueryDocumentSnapshot<
          Product,
          DocumentData
        > | null;
        state.totalProducts = action.payload.totalProducts;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchFilteredProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilteredProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.totalProducts = action.payload.totalProducts;
      })
      .addCase(fetchFilteredProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  resetState,
  clearError,
  setProductById,
  resetProduct,
  resetProducts,
} = productSlice.actions;

export default productSlice.reducer;




