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

const getPosts = async (userId, pageNo = 0, pageSize = 10) => {
  const res = await axiosClient.get(`/post/${userId}`, {
    params: {
      pageNo,
      pageSize,
    },
  });
  return res;
};

const getProfileAnother = async (userId) => {
  const res = await axiosClient.get(`/user/profile/${userId}`);
  return res;
};

export { register, login, getInfo, getPosts, getProfileAnother };
