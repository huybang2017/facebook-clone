import { getLastMessage } from "@/apis/message";
import { useQuery } from "@tanstack/react-query";

const useGetLastMessage = (chatId) => {
  return useQuery({
    queryKey: ["lastMessage", chatId],
    queryFn: async () => {
      const res = await getLastMessage(chatId);
      return res.data;
    },
    enabled: !!chatId,
  });
};

export default useGetLastMessage;
