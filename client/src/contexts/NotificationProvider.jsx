import React, { createContext, useContext, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { StoreContext } from "./StoreProvider";
import useWebSocket from "@/hooks/useWebSocket";

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const queryClient = useQueryClient();
  const { userInfo } = useContext(StoreContext);

  const { isConnected, stompClient } = useWebSocket();

  useEffect(() => {
    if (isConnected && userInfo && stompClient.current) {
      const subscription = stompClient.current.subscribe(
        `/user/${userInfo.data.email}/notifications`,
        (msg) => {
          const newNotification = JSON.parse(msg.body);
          setNotifications((prev) => [newNotification, ...prev]);
          // queryClient.invalidateQueries([
          //   "notificationList",
          //   userInfo.data.userId,
          // ]);
          queryClient.invalidateQueries([
            "notificationCount",
            userInfo.data.userId,
          ]);
        }
      );

      return () => subscription.unsubscribe();
    }
  }, [isConnected, userInfo, stompClient, queryClient]);

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => useContext(NotificationContext);
