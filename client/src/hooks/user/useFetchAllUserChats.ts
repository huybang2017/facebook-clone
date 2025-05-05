import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";
import { PaginateProps } from "./useFetchAllFriendSuggestions";

const apiClient = axiosInstance;

import ChatResponse from "../../entities/Chat";

const useFetchAllUserChats = ({ userId, pageSize }: PaginateProps) => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  return useInfiniteQuery<ChatResponse, Error>({
    queryKey: ["userChatList", userId],
    queryFn: async ({ pageParam = 0 }) => {
      const { data } = await apiClient.get<ChatResponse>(`/chat/${userId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        params: {
          pageNo: pageParam,
          pageSize: pageSize,
        },
      });
      return data;
    },
    getNextPageParam: (lastPage) => {
      const { pageResponse } = lastPage;
      const { pageNo, totalPages } = pageResponse;
      return pageNo + 1 < totalPages ? pageNo + 1 : undefined;
    },
    keepPreviousData: true,
    enabled: !!jwtToken && !!userId,
  });
};

export default useFetchAllUserChats;
