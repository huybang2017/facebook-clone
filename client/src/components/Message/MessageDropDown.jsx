import { useContext, useState, useMemo } from "react";
import { StoreContext } from "@/contexts/StoreProvider";
import { MessageCircle } from "lucide-react";
import DropdownModal from "../DropdownModal";
import MessengerPopup from "./MessagePopUp";
import useFetchAllUserChats from "@/hooks/useFetchAllUserChats";
import { useChatContext } from "@/contexts/ChatProvider";
import { useQueries } from "@tanstack/react-query";
import { getLastMessage } from "@/apis/message";

export default function MessageDropdown() {
  const { userInfo } = useContext(StoreContext);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const { messages: socketMessages } = useChatContext();

  const { data: allMessages } = useFetchAllUserChats({
    userId: userInfo?.data.userId,
  });

  const chatModels = allMessages?.pages.flatMap((page) => page.chatModels) || [];

  const lastMessagesQuery = useQueries({
    queries: chatModels.map((chat) => ({
      queryKey: ["lastMessage", chat.chatId],
      queryFn: () => getLastMessage(chat.chatId),
      enabled: !!chat.chatId,
    })),
  });

  const messages = useMemo(() => {
    return chatModels.map((chat, index) => {
      const lastSocketMsg = socketMessages
        .filter((m) => m.chatId === chat.chatId)
        .at(-1);

      const lastApiMsg = lastMessagesQuery[index]?.data?.data;

      const message = {
        chatId: chat.chatId,
        lastSocketMsg,
        lastApiMsg,
        privateChatUser: chat.privateChatUser,
      };

      return message;
    });
  }, [chatModels, socketMessages, lastMessagesQuery]);
  return (
    <>
      <DropdownModal
        trigger={
          <div className="relative w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center cursor-pointer">
            <MessageCircle className="w-5 h-5 text-gray-700" />
            {messages.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-1.5 -translate-y-1/2 translate-x-1/2">
                {messages.length}
              </span>
            )}
          </div>
        }
      >
        <div className="p-4 font-semibold text-lg border-b border-gray-300 bg-white shadow-md rounded-t-xl">
          Tin nhắn
        </div>
        <ul className="max-h-80 overflow-y-auto divide-y divide-gray-200 bg-white">
          {messages.length > 0 ? (
            messages.map((msg) => (
              <li
                key={msg.chatId}
                className="p-3 hover:bg-gray-50 cursor-pointer flex items-start space-x-3"
                onClick={() => {
                  setSelectedChat(msg);
                  setIsOpen(true);
                }}
              >
                <img
                  src={msg.privateChatUser?.profilePicture}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="font-medium">
                    {`${msg.privateChatUser?.firstName} ${msg.privateChatUser?.lastName}`}
                  </div>
                  <div className="text-sm text-gray-600 truncate max-w-[200px]">
                    {msg.lastSocketMsg?.message || msg.lastApiMsg?.message || "Chưa có tin nhắn"}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {msg.lastSocketMsg?.timestamp || msg.lastApiMsg?.timestamp || "Vừa mới tạo đoạn chat"}
                  </div>
                </div>
              </li>
            ))
          ) : (
            <div className="p-4 text-gray-400 text-sm text-center">Không có tin nhắn mới</div>
          )}
        </ul>
      </DropdownModal>

      <MessengerPopup
        chat={selectedChat}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
}
