import axiosClient from "./axiosClient";

const getAllUsers = async () => {
  return await axiosClient.get("/users/list");
};

const getAllFriends = async () => {
  return await axiosClient.get("/friends/list");
};

const getFriendById = async (friendId) => {
  return await axiosClient.get(`/friends/${friendId}`);
};

const deleteFriend = async (friendId) => {
  return await axiosClient.delete(`/friends/${friendId}`);
};
const getFriendRequest = async () => {
  return await axiosClient.get("/friends/request");
};

const delelteFriendRequest = async (requestId) => {
  return await axiosClient.delete(`/friends/request/${requestId}`);
};

const addFriendRequest = async (friendId) => {
  return await axiosClient.post(`/friends/request/${friendId}`);
};

const getFriendInvitation = async () => {
  return await axiosClient.get("/friends/invitation");
};

const acceptFriendAcvitation = async (requestId) => {
  return await axiosClient.post(`/friends/invitation/accept/${requestId}`);
};

const rejectFriendRequest = async (requestId) => {
  return await axiosClient.post(`/friends/invitation/reject/${requestId}`);
};

export {
  getAllUsers,
  getAllFriends,
  getFriendById,
  deleteFriend,
  addFriendRequest,
  getFriendRequest,
  delelteFriendRequest,
  getFriendInvitation,
  acceptFriendAcvitation,
  rejectFriendRequest,
};
