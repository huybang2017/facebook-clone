import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ChatBox({ user }) {
  const [messages, setMessages] = useState([
    { sender: "them", text: "Xin chào! 👋", time: "10:01 AM" },
    { sender: "me", text: "Chào bạn! 😃", time: "10:02 AM" },
    { sender: "them", text: "Bạn đang làm gì đó?", time: "10:05 AM" },
    { sender: "me", text: "Mình đang code React nè! 🚀", time: "10:06 AM" },
    {
      sender: "them",
      text: "Hay quá! Dùng thư viện gì vậy?",
      time: "10:07 AM",
    },
    { sender: "me", text: "Mình dùng Tailwind + Shadcn UI!", time: "10:08 AM" },
    { sender: "them", text: "Ngon đó, share mình với 😆", time: "10:10 AM" },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([
        ...messages,
        { sender: "me", text: newMessage, time: "10:12 AM" },
      ]);
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full border rounded-lg w-full max-w-md mx-auto">
      {/* Header */}
      <div className="p-4 border-b bg-white flex items-center">
        <h3 className="text-lg font-medium">{user.name}</h3>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-2 rounded-lg max-w-xs ${
                msg.sender === "me"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-white flex items-center gap-2">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Nhập tin nhắn..."
        />
        <Button onClick={sendMessage}>Gửi</Button>
      </div>
    </div>
  );
}
