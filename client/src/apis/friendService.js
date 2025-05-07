import axiosClient from "./axiosClient";

// Gửi lời mời kết bạn
const addFriendRequest = async (strangerUserId) => {
  return await axiosClient.post(`/friends/add/${strangerUserId}`);
};

// Chấp nhận lời mời kết bạn
const acceptFriendRequest = async (strangerUserId) => {
  return await axiosClient.post(`/friends/accept/${strangerUserId}`);
};

// Lấy danh sách lời mời kết bạn (người gửi cho user)
const getFriendRequests = async (userId, pageNo = 0, pageSize = 10) => {
  return await axiosClient.get(`/friends/request/list/${userId}`, {
    params: { pageNo, pageSize },
  });
};

// Lấy danh sách bạn bè của user
const getUserFriends = async (userId, pageNo = 0, pageSize = 10) => {
  const res = await axiosClient.get(`/friends/list/${userId}`, {
    params: { pageNo, pageSize },
  });
  return res;
};

// Trạng thái bạn bè (có đang là bạn hay không)
const getFriendshipStatus = async (friendId) => {
  return await axiosClient.get(`/friends/status/${friendId}`);
};

// Trạng thái lời mời kết bạn (đang chờ)
const getFriendRequestStatus = async (friendId) => {
  return await axiosClient.get(`/friends/status/request/${friendId}`);
};

// Hủy kết bạn
const unfriend = async (userId, friendId) => {
  return await axiosClient.delete(`/friends/unfriend/${userId}/${friendId}`);
};

// Xóa lời mời kết bạn đã gửi hoặc đã nhận
const deleteFriendRequest = async (userId, strangerId) => {
  return await axiosClient.delete(`/friends/delete/${userId}/${strangerId}`);
};

// Đếm số lượng bạn bè
const getFriendCount = async (userId) => {
  return await axiosClient.get(`/friends/count/${userId}`);
};

// Gợi ý kết bạn
const getFriendSuggestions = async (userId, pageNo = 0, pageSize = 10) => {
  return await axiosClient.get(`/friends/suggestions/${userId}`, {
    params: { pageNo, pageSize },
  });
};

export {
  addFriendRequest,
  acceptFriendRequest,
  getFriendRequests,
  getUserFriends,
  getFriendshipStatus,
  getFriendRequestStatus,
  unfriend,
  deleteFriendRequest,
  getFriendCount,
  getFriendSuggestions,
};
