import { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const useWebSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const stompClientRef = useRef(null);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        stompClientRef.current = stompClient;
        setIsConnected(true);
        console.log("✅ Kết nối WebSocket thành công");
      },
      onError: (error) => {
        console.error("WebSocket connection error:", error);
      },
    });

    stompClient.activate();

    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
        console.log("Disconnected from WebSocket");
      }
    };
  }, []);

  return {
    isConnected,
    stompClient: stompClientRef,
  };
};

export default useWebSocket;
