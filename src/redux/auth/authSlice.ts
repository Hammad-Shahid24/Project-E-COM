import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../config/firebase"; // import from your Firebase config
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import app from "../../config/firebase";

const db = getFirestore(app);

interface AuthState {
  user: Record<string, any> | null;
  loading: boolean;
  error: string | null;
}

interface SignUpPayload {
  email: string;
  password: string;
  additionalData: Record<string, any>;
}

interface SignInPayload {
  email: string;
  password: string;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

interface UserData {
  isAdmin: boolean;
  [key: string]: any; // Add other user data properties as needed
}

const fetchUserData = async (uid: string): Promise<UserData> => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      const userData = userDoc.data() as UserData;
      if (!userData.isAdmin) {
        return userData;
      } else {
        throw new Error("User shouldn't be an admin.");
      }
    } else {
      throw new Error("User data not found in Firestore.");
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

// Sign up user
export const signUp = createAsyncThunk(
  "auth/signUp",
  async (
    { email, password, additionalData }: SignUpPayload,
    { rejectWithValue }
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userData = {
        id: user.uid,
        isAdmin: false,
        email,
        ...additionalData,
        emailVerified: user.emailVerified,
      };
      await setDoc(doc(db, "users", user.uid), userData);

      return { ...userData };
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        return rejectWithValue(
          "This email is already in use. Please use a different email."
        );
      } else {
        return rejectWithValue(error.message || "An unknown error occurred.");
      }
    }
  }
);

// Sign in user
export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }: SignInPayload, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      return await fetchUserData(user.uid);
    } catch (error: any) {
      return rejectWithValue(error.message || "An unknown error occurred.");
    }
  }
);

// Log out user
export const logOut = createAsyncThunk(
  "auth/logOut",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
    } catch (error: any) {
      return rejectWithValue(error.message || "An unknown error occurred.");
    }
  }
);

export const recoverPassword = createAsyncThunk(
  "auth/recoverPassword",
  async (email: string, { rejectWithValue }) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      return rejectWithValue(error.message || "An unknown error occurred.");
    }
  }
);

// Thunk to initialize the auth state (Check persistence on reload)
export const initializeAuth = createAsyncThunk(
  "auth/initializeAuth",
  async (_, { dispatch }) => {
    return new Promise<Record<string, any> | null>((resolve) => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userData = await fetchUserData(user.uid);
          dispatch(setUser(userData)); // Ensure `setUser` is called here
          resolve(userData);
        } else {
          resolve(null);
        }
      });
    });
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    reset: (state) => {
      state.user = null;
    },
    updateUserData: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(initializeAuth.rejected, (state, action) => {
        state.error = action.payload as string;
        console.error("Error initializing user:", action.payload);
      })
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        console.log("Sign-up successful:", action.payload);
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Ensure this is a string
      })
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        console.error("Sign-in failed:", action);
        state.loading = false;
        state.error = action.payload as string; // Ensure this is a string
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(recoverPassword.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(recoverPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(recoverPassword.fulfilled, (state) => {
        state.loading = false;
      });
  },
});

export const { setUser, clearError, reset, updateUserData } = authSlice.actions;

export default authSlice.reducer;
