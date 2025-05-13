import { fetchAllChatMessages } from "@/apis/message";
import { useInfiniteQuery } from "@tanstack/react-query";

const useFetchChatMessages = ({ chatId, pageSize = 100000 }) => {
  return useInfiniteQuery({
    queryKey: ["chatMessages", chatId],
    queryFn: async ({ pageParam }) => {
      const res = await fetchAllChatMessages(chatId, pageParam, pageSize);
      return res.data;
    },
    getNextPageParam: (lastPage) => {
      const { pageResponse } = lastPage;
      const { pageNo, totalPages } = pageResponse;
      return pageNo + 1 < totalPages ? pageNo + 1 : undefined;
    },
    enabled: !!chatId,
  });
};

export default useFetchChatMessages;
