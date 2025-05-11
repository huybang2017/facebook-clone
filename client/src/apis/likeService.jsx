import axiosClient from "./axiosClient";
// [GET] Lấy danh sách tất cả bào post của ứng dụng
const getCountLike = async (id) => {
  return await axiosClient.get(`/post/${id}/like/count`);
};

// [GET] Kiểm trả người dùng đang đăng nhập đã like bài viết hay chưa
const getIsLike = async (id) => {
  return await axiosClient.get(`/post/${id}/like`);
};

// [GET] Lấy danh sách người dùng đã like bài viết
const getPeopleLike = async (id) => {
  return await axiosClient.get(
    `/post/${id}/like/user/list?pageNo=0&pageSize=1000`
  );
};

// [PUT] Like hoặc unlike một bài viết
const putLikeOrUnlike = async (id) => {
  return await axiosClient.put(`/post/${id}/like`);
};

export { getCountLike, getIsLike, putLikeOrUnlike, getPeopleLike };
