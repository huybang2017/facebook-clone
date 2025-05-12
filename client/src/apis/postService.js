import axiosClient from "./axiosClient";
// [GET] Lấy danh sách tất cả bào post của ứng dụng
const getAll = async () => {
  return await axiosClient.get("/post/get/all?pageNo=0&pageSize=1000");
};

// [GET] Lấy thông tin bài post theo postId
const getById = async (id) => {
  return await axiosClient.get(`/post/get/${id}`);
};

// [GET] Lấy danh sách bài post của người dùng theo userId
const getOfUser = async (id) => {
  return await axiosClient.get(`post/${id}?pageNo=0&pageSize=1000`);
};

// [POST] Đăng bài post
const create = async (body, id) => {
  return await axiosClient.post(`/post/save/${id}`, body);
};

// [DELETE] Xóa bài post theo postId
const deletePost = async (id) => {
  return await axiosClient.post(`/post/delete/${id}`);
};

export { getAll, getById, getOfUser, create, deletePost };
