import axiosClient from "./axiosClient";

// Hàm call api chức năng đăng ký
const register = async (body) => {
  return await axiosClient.post("/user/register", body);
};

// Hàm call api chức năng đăng nhập
const login = async (body) => {
  return await axiosClient.post("/user/login", body);
};

// Hàm call api lấy thông tin người dùng đã đăng nhập bằng token
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

export { register, login, getInfo, getPosts };
