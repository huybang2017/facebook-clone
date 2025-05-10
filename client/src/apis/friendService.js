import axiosClient from "./axiosClient";

// Lấy thông tin friend của user
const getProfileUser = (friendId) =>
  axiosClient.get(`user/profile/${friendId}`);

// Gửi lời mời kết bạn
const addFriendRequest = (strangerUserId) =>
  axiosClient.post(`/friends/add/${strangerUserId}`);

// Chấp nhận lời mời kết bạn
const acceptFriendRequest = (strangerUserId) =>
  axiosClient.post(`/friends/accept/${strangerUserId}`);

// Lấy danh sách yêu cầu kết bạn user gửi cho người khác
const getSentFriendRequests = (userId) =>
  axiosClient.get(`/friends/requests/sent/${userId}?pageSize=100`);

// Lấy danh sách lời mời kết bạn đã nhận
const getReceivedFriendRequests = (userId) =>
  axiosClient.get(`/friends/requests/received/${userId}?pageSize=100`);

// Lấy danh sách bạn bè của user
const getUserFriends = (userId) =>
  axiosClient.get(`/friends/list/${userId}?pageSize=100`);

// Trạng thái bạn bè (có đang là bạn hay không)
const getFriendshipStatus = (friendId) =>
  axiosClient.get(`/friends/status/${friendId}`);

// Trạng thái lời mời kết bạn (đang chờ)
const getFriendRequestStatus = (friendId) =>
  axiosClient.get(`/friends/status/request/${friendId}`);

// Hủy kết bạn
const unfriend = (userId, friendId) =>
  axiosClient.delete(`/friends/unfriend/${userId}/${friendId}`);

// Xóa lời mời kết bạn đã gửi hoặc đã nhận
const deleteFriendRequest = (userId, strangerId) =>
  axiosClient.delete(`/friends/delete/${userId}/${strangerId}`);

// Đếm số lượng bạn bè
const getFriendCount = (userId) => axiosClient.get(`/friends/count/${userId}`);

// Gợi ý kết bạn
const getFriendSuggestions = (userId) =>
  axiosClient.get(`/friends/suggestions/${userId}`);

export {
  getProfileUser,
  addFriendRequest,
  acceptFriendRequest,
  getSentFriendRequests,
  getReceivedFriendRequests,
  getUserFriends,
  getFriendshipStatus,
  getFriendRequestStatus,
  unfriend,
  deleteFriendRequest,
  getFriendCount,
  getFriendSuggestions,
};
