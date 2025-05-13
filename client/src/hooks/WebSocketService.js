import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

class WebSocketService {
  constructor() {
    this.client = null;
    this.connected = false;
  }

  connect = (userId, onOffer, onAnswer, onIce) => {
    const socket = new SockJS("http://localhost:8080/ws"); // Đảm bảo địa chỉ đúng với backend
    this.client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log("Connected to WebSocket");
        this.connected = true;

        // Subscribe to the topic of the userId to receive messages
        this.client.subscribe(`/topic/${userId}`, (message) => {
          const data = JSON.parse(message.body);

          switch (data.type) {
            case "offer":
              onOffer(data);
              break;
            case "answer":
              onAnswer(data);
              break;
            case "ice":
              onIce(data);
              break;
            default:
              console.log("Unknown message type:", data.type);
          }
        });
      },
      onDisconnect: () => {
        console.log("Disconnected from WebSocket");
        this.connected = false;
      },
      onError: (error) => {
        console.error("Error with WebSocket:", error);
      },
    });

    this.client.activate();
  };

  sendOffer = (offer, senderId, receiverId) => {
    if (this.connected) {
      const message = {
        type: "offer",
        senderId,
        receiverId,
        offer,
      };
      this.client.publish({
        destination: `/app/offer`,
        body: JSON.stringify(message),
      });
    }
  };

  sendAnswer = (answer, senderId, receiverId) => {
    if (this.connected) {
      const message = {
        type: "answer",
        senderId,
        receiverId,
        answer,
      };
      this.client.publish({
        destination: `/app/answer`,
        body: JSON.stringify(message),
      });
    }
  };

  sendIceCandidate = (candidate, senderId, receiverId) => {
    if (this.connected) {
      const message = {
        type: "ice",
        senderId,
        receiverId,
        candidate,
      };
      this.client.publish({
        destination: `/app/ice`,
        body: JSON.stringify(message),
      });
    }
  };

  disconnect = () => {
    if (this.client) {
      this.client.deactivate();
    }
  };
}

export default new WebSocketService();
