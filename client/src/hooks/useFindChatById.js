import { useQuery } from "@tanstack/react-query";
import { findChatById } from "@/apis/chatApi";

const useFindChatById = (chatId, userId) => {
  return useQuery({
    queryKey: ["chatDetail", chatId, userId],
    queryFn: () => findChatById(chatId, userId),
    enabled: !!chatId && !!userId,
  });
};

export default useFindChatById;
