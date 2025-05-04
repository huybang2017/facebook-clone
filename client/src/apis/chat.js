import axiosClient from "./axiosClient";

export const chatUser = async (friendId) => {
  const res = await axiosClient.post(`/chat/${friendId}`);
  return res;
};

export const fetchAllUserChats = async (userId, pageNo = 0, pageSize = 10) => {
  const res = await axiosClient.get(`/chat/${userId}`, {
    params: { pageNo, pageSize },
  });
  return res;
};

export const findChatById = async (chatId, userId) => {
  const res = await axiosClient.get(`/chat/get/${chatId}/${userId}`);
  return res;
};

export const createGroupChat = async (groupChatData) => {
  const res = await axiosClient.post(`/chat/group/create`, groupChatData);
  return res;
};

export const uploadGroupChatPhoto = async (chatId, file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await axiosClient.post(`/chat/group/upload/image/${chatId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
};

export const updateGroupChatName = async (data) => {
  const res = await axiosClient.post(`/chat/group/change/name`, data);
  return res;
};

export const addUserToGroupChat = async (chatId, data) => {
  const res = await axiosClient.post(`/chat/group/add/user/${chatId}`, data);
  return res;
};

export const leaveGroupChat = async (chatId, userId, leaveReason) => {
  const res = await axiosClient.post(`/chat/group/leave/${chatId}/${userId}/${leaveReason}`);
  return res;
};
