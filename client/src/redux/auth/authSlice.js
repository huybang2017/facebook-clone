import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getInfo } from "@/apis/authService";

const initialState = {
  accessToken: localStorage.getItem("token") || "",
  role: localStorage.getItem("role") || "",
  userInfo: null,
  status: "idle",
};

export const verifyTokenThunk = createAsyncThunk(
  "auth/verifyToken",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getInfo();
      return res.data;
    } catch (err) {
      console.log(err)
      return rejectWithValue("Token không hợp lệ");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLocalStorage(state, action) {
      state.accessToken = action.payload.accessToken;
      state.role = action.payload.role;
      localStorage.setItem("token", action.payload.accessToken);
      localStorage.setItem("role", action.payload.role);
    },

    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    logout(state) {
      state.accessToken = "";
      state.role = "";
      state.userInfo = null;
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyTokenThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(verifyTokenThunk.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.status = "success";
      })
      .addCase(verifyTokenThunk.rejected, (state) => {
        state.accessToken = "";
        state.role = "";
        state.userInfo = null;
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        state.status = "error";
      });
  },
});

export const { setLocalStorage, setRole, setUserInfo, logout } = authSlice.actions;
export default authSlice.reducer;

