// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { User } from "../../types/Auth";

// interface AuthState {
//   user: User | null;
// }

// const initialState: AuthState = {
//   user: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     register: (state, action: PayloadAction<User>) => {
//       sessionStorage.setItem("user", JSON.stringify(action.payload));
//       state.user = action.payload;
//     },
//     logout: (state) => {
//       state.user = null;
//     },
//     login: (state, action: PayloadAction<User>) => {
//       const savedUser = sessionStorage.getItem("user");
//       if (!savedUser) {
//         throw new Error("No user found in local storage");
//       }

//       const parsedUser: User = JSON.parse(savedUser);
//       if (
//         action.payload.email === parsedUser.email &&
//         action.payload.password === parsedUser.password
//       ) {
//         state.user = parsedUser;
//       } else {
//         throw new Error("Invalid email or password");
//       }
//     },
//   },
// });

// export const { register, login, logout } = authSlice.actions;
// export default authSlice.reducer;
