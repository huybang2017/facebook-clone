import { useInfiniteQuery } from "@tanstack/react-query";
import PostListResponse from "../../entities/Post";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

const apiClient = axiosInstance;

interface PaginateProps {
  userId: number;
  pageSize: number;
}

const useFetchAllUserPosts = ({ userId, pageSize }: PaginateProps) => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;

  return useInfiniteQuery<PostListResponse, Error>({
    queryKey: ["userPostList", userId],
    queryFn: async ({ pageParam = 0 }) => {
      const { data } = await apiClient.get<PostListResponse>(
        `/post/${userId}`,
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
    enabled: !!jwtToken,
  });
};

export default useFetchAllUserPosts;
