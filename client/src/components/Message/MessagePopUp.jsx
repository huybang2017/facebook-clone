import { StoreContext } from "@/contexts/StoreProvider";
import useFetchChatMessages from "@/hooks/useFetchChatMessages";
import useSendMessage from "@/hooks/useSendMessage";
import { useQueryClient } from "@tanstack/react-query";
import { Camera, Phone, SendHorizontal, Video, X } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";

const MessengerPopup = ({ chat, isOpen, setIsOpen }) => {
  const [input, setInput] = useState("");
  const { userInfo } = useContext(StoreContext);
  const sendMessageMutation = useSendMessage();
  const queryClient = useQueryClient();
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const { data, fetchPreviousPage, hasPreviousPage, isFetchingPreviousPage } =
    useFetchChatMessages({ chatId: chat?.chatId });
  console.log(data);

  const messages = data?.pages?.flatMap((page) => page.messageModels) || [];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [data]);

  const handleScroll = () => {
    const container = messagesContainerRef.current;
    if (
      container?.scrollTop === 0 &&
      hasPreviousPage &&
      !isFetchingPreviousPage
    ) {
      fetchPreviousPage();
    }
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    sendMessageMutation.mutate(
      {
        chatId: chat?.chatId,
        text: input,
      },
      {
        onSuccess: () => {
          setInput("");
          queryClient.invalidateQueries({
            queryKey: ["chatMessages", chat?.chatId],
          });
          queryClient.invalidateQueries({
            queryKey: ["lastMessage", chat?.chatId],
          });
        },
        onError: (error) => {
          console.error("Gửi tin nhắn thất bại:", error);
        },
      }
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleMessenger = () => {
    setIsOpen(!isOpen);
  };

  return (
    isOpen && (
      <div className="fixed bottom-0 right-10 bg-white shadow-xl rounded-t-lg flex flex-col overflow-hidden border border-gray-300 w-[350px] h-[500px]">
        {/* Header */}
        <div className="flex items-center justify-between p-3 bg-[#f0f0f0] text-black rounded-t-lg">
          <div className="flex items-center gap-2">
            <img
              src={
                chat?.privateChatUser?.profilePicture ||
                "https://via.placeholder.com/40"
              }
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-sm font-semibold">
                {chat?.privateChatUser?.firstName}{" "}
                {chat?.privateChatUser?.lastName}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <button title="Call" className="hover:text-blue-500">
              <Phone />
            </button>
            <button title="Video" className="hover:text-blue-500">
              <Video />
            </button>
            <button
              title="Close"
              className="hover:text-blue-500"
              onClick={toggleMessenger}
            >
              <X />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div
          ref={messagesContainerRef}
          onScroll={handleScroll}
          className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#fafafa] text-black text-sm"
        >
          {messages.map((msg) => (
            <div
              key={msg.messageId}
              className={`max-w-[80%] px-4 py-2 rounded-lg break-words ${
                userInfo?.data.userId === msg.sender.userId
                  ? "bg-blue-500 ml-auto text-white"
                  : "bg-gray-200 mr-auto text-black"
              }`}
            >
              <p>{msg.message}</p>
              <span
                className={`text-xs mt-1 block ${
                  userInfo?.data.userId === msg.sender.userId
                    ? "text-white"
                    : "text-gray-500"
                }`}
              >
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="flex items-center border-t border-gray-300 p-3 bg-[#f0f0f0]">
          <button className="text-xl mr-3 hover:text-blue-500">
            <Camera />
          </button>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            rows={1}
            className="flex-1 resize-none bg-transparent outline-none text-black text-sm placeholder-gray-500"
            placeholder="Aa"
          />
          <button
            onClick={handleSendMessage}
            className="ml-3 hover:text-blue-500"
          >
            <SendHorizontal />
          </button>
        </div>
      </div>
    )
  );
};

export default MessengerPopup;
