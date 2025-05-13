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
const getPosts = (userId) => axiosClient.get(`/post/${userId}?pageSize=100`);

const getProfileAnother = async (userId) => {
  const res = await axiosClient.get(`/user/profile/${userId}`);
  return res;
};

const getProfileDetail = (id) => axiosClient.get(`/user/profile/${id}`);

const searchUsers = (keyword) => axiosClient.get(`/user/search?keyword=${keyword}`)


export {
  register,
  login,
  getInfo,
  getPosts,
  searchUsers,
  getProfileDetail,
  getProfileAnother,
};
