import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/auth/authSlice";

const store = configureStore({
  reducer: {
    authReducer: authReducer,
  },
});

export default store;
