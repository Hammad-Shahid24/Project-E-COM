import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCategories } from "./categoryService";
import { Category } from "../../types/Shopping";

// Define the initial state using the CategoryData type
interface CategoryState {
  categories: Category[]; // Default as an empty array
  category: Category | null;
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [], // Initialize as an empty array
  category: null,
  loading: false,
  error: null,
};

// Fetch categories
export const fetchAllCategories = createAsyncThunk(
  "category/fetchAllCategories",
  async (_, { rejectWithValue }) => {
    try {
      const categories = await fetchCategories();
      return categories;
    } catch (error: any) {
      return rejectWithValue(
        error.message || "An error occurred while fetching categories."
      );
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    resetState: (state) => {
      state.categories = [];
      state.loading = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setCategoryById: (state, action) => {
      state.category =
        state.categories.find(
          (category) => category.id === (action.payload as string)
        ) ?? null;
    },
    resetCategory: (state) => {
      state.category = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload as Category[];
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetState, clearError, setCategoryById, resetCategory } =
  categorySlice.actions;

export default categorySlice.reducer;
