import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";
import { UserListResponseProps } from "./useGetPostLikeUserList";

const apiClient = axiosInstance;

interface PaginateProps {
  userId: number | null;
  pageSize: number;
}

const useFetchAllFriendRequest = ({ userId, pageSize }: PaginateProps) => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  return useInfiniteQuery<UserListResponseProps, Error>({
    queryKey: ["friendRequestList", userId],
    queryFn: async ({ pageParam = 0 }) => {
      const { data } = await apiClient.get<UserListResponseProps>(
        `/friends/request/list/${userId}`,
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

export default useFetchAllFriendRequest;
