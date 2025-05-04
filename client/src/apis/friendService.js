import axiosClient from "./axiosClient";

const getUsers = async () => {
  return await axiosClient.get("/users");
};

const getFriends = async () => {
  return await axiosClient.get("/friends");
};

const getFriendRequests = async () => {
  return await axiosClient.get("/friend-requests");
};

const sendFriendRequest = async (userId) => {
  return await axiosClient.post("/friend-requests", { userId });
};

const acceptFriendRequest = async (requestId) => {
  return await axiosClient.post(`friend-requests/${requestId}/accept`);
};

const rejectFriendRequest = async (requestId) => {
  return await axiosClient.post(`friend-requests/${requestId}/reject`);
};

export {
  getUsers,
  getFriends,
  getFriendRequests,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
};
