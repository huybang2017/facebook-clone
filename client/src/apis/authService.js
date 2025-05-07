import axiosClient from "./axiosClient";

// Hàm call api chức năng đăng ký
const register = async (body) => {
  return await axiosClient.post("/auth/login", body);
};

// Hàm call api chức năng đăng nhập
const login = async (body) => {
  return await axiosClient.post("/auth/login", body);
};

// Hàm call api lấy thông tin người dùng đã đăng nhập bằng token
const getInfo = async (token) => {
  return await axiosClient.post(`/auth/verify?token=${token}`);
};

const getPosts = async () => {
  const res = await axiosClient.get("/posts");
  return res;
};

export { register, login, getInfo, getPosts };
