import axiosClient from "./axiosClient";

// [GET] Lấy danh sách các bình luận
const getAllComment = async (id) => {
  return await axiosClient.get(`/post/${id}/comment?pageNo=0&pageSize=1000`);
};

// [GET] Lấy tổng số comment của bài viết
const getCountComment = async (id) => {
  return await axiosClient.get(`/post/${id}/comment/count`);
};

// [POST] Viết comment mới
const writeComment = async (formData, id) => {
  return await axiosClient.post(`/post/${id}/comment`, formData);
};

export { getAllComment, getCountComment, writeComment };
