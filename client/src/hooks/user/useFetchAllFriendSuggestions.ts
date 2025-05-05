import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";
import { UserListResponseProps } from "./useGetPostLikeUserList";

const apiClient = axiosInstance;

export interface PaginateProps {
  userId: number | null;
  pageSize: number;
}

const useFetchAllFriendSuggestions = ({ userId, pageSize }: PaginateProps) => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  return useInfiniteQuery<UserListResponseProps, Error>({
    queryKey: ["friendSuggestionsList", userId],
    queryFn: async ({ pageParam = 0 }) => {
      const { data } = await apiClient.get<UserListResponseProps>(
        `/friends/suggestions/${userId}`,
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
    enabled: !!jwtToken && !!userId,
  });
};

export default useFetchAllFriendSuggestions;
