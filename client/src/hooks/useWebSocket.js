// import { useEffect, useState } from "react";
// import SockJS from "sockjs-client";
// import { Client } from "@stomp/stompjs";
//
// const useWebSocket = (url, subscribeTo, publishTo) => {
//   const [messages, setMessages] = useState([]);
//   const [stompClient, setStompClient] = useState(null);
//
//   useEffect(() => {
//     const socket = new SockJS(url);
//     const client = new Client({
//       webSocketFactory: () => socket,
//       reconnectDelay: 5000,
//       onConnect: () => {
//         console.log("Connected to WebSocket");
//
//         client.subscribe(subscribeTo, (msg) => {
//           setMessages((prevMessages) => [...prevMessages, msg.body]);
//         });
//       },
//       onWebSocketError: (err) => {
//         console.log("WebSocket Error: ", err);
//       },
//     });
//
//
//     client.activate();
//     setStompClient(client);
//
//     return () => {
//       client.deactivate();
//     };
//   }, [url, subscribeTo]);
//
//   const sendMessage = (message) => {
//     if (stompClient && publishTo && message.trim() !== "") {
//       stompClient.publish({
//         destination: publishTo,
//         body: message,
//       });
//     }
//   };
//
//   return { messages, sendMessage };
// };
//
// export default useWebSocket;

