import React, { createContext, useContext, useEffect, useState } from "react";
import useWebSocket from "@/hooks/useWebSocket";
import { StoreContext } from "./StoreProvider";
import { useQueryClient } from "@tanstack/react-query";

const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const { isConnected, stompClient } = useWebSocket();
    const { userInfo } = useContext(StoreContext);
    const queryClient = useQueryClient();

    useEffect(() => {
        if (isConnected && userInfo && stompClient.current) {
            const subscription = stompClient.current.subscribe(
                `/user/${userInfo.data.email}/chat`,
                (msg) => {
                    const newMessage = JSON.parse(msg.body);
                    setMessages((prev) => [...prev, newMessage]);

                    // Sau khi nhận tin nhắn mới, invalidate query để refetch dữ liệu từ server
                    queryClient.invalidateQueries(["chatMessages", newMessage.chatId]);
                }
            );

            return () => {
                subscription.unsubscribe();
            };
        }
    }, [isConnected, userInfo, stompClient, queryClient]);

    const sendMessage = (destination, messagePayload) => {
        if (stompClient.current && isConnected) {
            console.log("Gửi tin nhắn:", messagePayload);
            stompClient.current.send(destination, {}, JSON.stringify(messagePayload));

            // Sau khi gửi tin nhắn thành công, invalidate query để refetch lại tin nhắn
            queryClient.invalidateQueries(["chatMessages", messagePayload.chatId]);
        } else {
            console.warn("❌ Chưa kết nối WebSocket. Không thể gửi tin nhắn.");
        }
    };

    return (
        <ChatContext.Provider value={{ messages, sendMessage }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChatContext = () => useContext(ChatContext);
