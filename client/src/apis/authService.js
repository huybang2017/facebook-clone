import axiosClient from "./axiosClient";

const register = async (body) => {
  return await axiosClient.post("/user/register", body);
};

const login = async (body) => {
  return await axiosClient.post("/user/login", body);
};

const getInfo = async () => {
  return await axiosClient.get(`/user`);
};

// Hàm call api lấy danh sách bài post
const getPosts = (userId) => axiosClient.get(`/post/${userId}`);

const getProfileAnother = async (userId) => {
  const res = await axiosClient.get(`/user/profile/${userId}`);
  return res;
};

export { register, login, getInfo, getPosts, getProfileAnother };
