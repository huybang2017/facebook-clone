import { useInfiniteQuery } from "@tanstack/react-query";
import MessageResponse from "../../entities/Message";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

const apiClient = axiosInstance;

interface Props {
  chatId: number;
  pageSize: number;
}

const useFetchAllChatMessages = ({ chatId, pageSize }: Props) => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  return useInfiniteQuery<MessageResponse, Error>({
    queryKey: ["messages", chatId],
    queryFn: async ({ pageParam = 0 }) => {
      const { data } = await apiClient.get<MessageResponse>(
        `/chat/message/${chatId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          params: {
            pageNo: pageParam,
            pageSize: pageSize,
          },
        }
      );
      return data;
    },
    getNextPageParam: (lastPage) => {
      const { pageResponse } = lastPage;
      const { pageNo, totalPages } = pageResponse;
      return pageNo + 1 < totalPages ? pageNo + 1 : undefined;
    },
    keepPreviousData: true,
    enabled: !!jwtToken && !!chatId,
  });
};

export default useFetchAllChatMessages;
