import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./authSlice";

export const loginUser = async (data, dispath, navigate) => {
  dispath(loginStart());
  try {
    const res = await axios.post("http://localhost:8080/api/auth/login", data);
    dispath(loginSuccess(res.data));
    navigate("/");
  } catch (error) {
    dispath(loginFailure(error.response.data));
  }
};
