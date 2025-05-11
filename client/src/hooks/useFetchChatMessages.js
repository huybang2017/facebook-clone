import { fetchAllChatMessages } from "@/apis/message";
import { useInfiniteQuery } from "@tanstack/react-query";

const useFetchChatMessages = ({ chatId, pageSize = 10 }) => {
  return useInfiniteQuery({
    queryKey: ["chatMessages", chatId],
    queryFn: async ({ pageParam }) => {
      const res = await fetchAllChatMessages(chatId, pageParam, pageSize);
      return res.data;
    },
    getPreviousPageParam: (firstPage) => {
      const { pageResponse } = firstPage;
      const { pageNo } = pageResponse;
      return pageNo > 0 ? pageNo - 1 : undefined;
    },
    enabled: !!chatId,
    initialPageParam: 2,
  });
};

export default useFetchChatMessages;
