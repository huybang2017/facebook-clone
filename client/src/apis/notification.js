import axiosClient from "./axiosClient";

export const fetchAllNotifications = async (
  userId,
  pageNo = 0,
  pageSize = 10
) => {
  const res = await axiosClient.get(`/notifications/${userId}`, {
    params: { pageNo, pageSize },
  });
  return res;
};

export const markAsRead = async (notificationId) => {
  const res = await axiosClient.post(`/notifications/${notificationId}`);
  return res;
};

export const getNotificationCount = async (userId) => {
  const res = await axiosClient.get(`/notifications/count/${userId}`);
  return res;
};

export const deleteNotification = async (notificationId) => {
  const res = await axiosClient.delete(`/notifications/${notificationId}`);
  return res;
};
