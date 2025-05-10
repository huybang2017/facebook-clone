import axiosClient from "./axiosClient";

// Hàm call api chức năng đăng ký
const register = (body) => axiosClient.post("/user/register", body);

// Hàm call api chức năng đăng nhập
const login = (body) => axiosClient.post("/user/login", body);

// Hàm call api lấy thông tin người dùng
const getInfo = () => axiosClient.get(`/user`);

// Hàm call api lấy danh sách bài post
const getPosts = (userId) => axiosClient.get(`/post/${userId}`);

export { register, login, getInfo, getPosts };
