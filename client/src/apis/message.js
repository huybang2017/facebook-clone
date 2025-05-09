import axiosClient from "./axiosClient";

export const sendMessage = async (messageData) => {
  const res = await axiosClient.post("/chat/message", messageData);
  return res;
};

export const fetchAllChatMessages = async (
  chatId,
  pageNo = 0,
  pageSize = 10
) => {
  const res = await axiosClient.get(`/chat/message/${chatId}`, {
    params: { pageNo, pageSize },
  });
  return res;
};

export const getLastMessage = async (chatId) => {
  const res = await axiosClient.get(`/chat/message/last/${chatId}`);
  return res;
};
