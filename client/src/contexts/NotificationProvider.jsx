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
          queryClient.setQueryData(
            ["notificationList", userInfo.data.userId],
            (oldData) => {
              if (!oldData) return oldData;
              return {
                ...oldData,
                pages: [
                  {
                    ...oldData.pages[0],
                    content: [newNotification, ...oldData.pages[0].content],
                  },
                  ...oldData.pages.slice(1),
                ],
              };
            }
          );
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
