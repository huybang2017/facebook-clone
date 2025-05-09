import React, { createContext, useContext, useEffect, useState } from "react";
import useWebSocket from "@/hooks/useWebSocket";
import { StoreContext } from "./StoreProvider";

const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const { isConnected, stompClient } = useWebSocket();
    const { userInfo } = useContext(StoreContext);

    useEffect(() => {
        if (isConnected && userInfo && stompClient.current) {
            const subscription = stompClient.current.subscribe(
                `/user/${userInfo.data.email}/chat`,
                (msg) => {
                    const newMessage = JSON.parse(msg.body);
                    setMessages((prev) => [...prev, newMessage]);
                }
            );

            return () => {
                subscription.unsubscribe();
            };
        }
    }, [isConnected, userInfo, stompClient]);

    const sendMessage = (destination, messagePayload) => {
        if (stompClient.current && isConnected) {
            stompClient.current.send(destination, {}, JSON.stringify(messagePayload));
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
