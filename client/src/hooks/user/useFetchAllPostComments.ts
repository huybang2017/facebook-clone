import { useInfiniteQuery } from "@tanstack/react-query";
import PostCommentListResponse from "../../entities/PostComment";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

interface PaginateProps {
  postId: number;
  pageSize: number;
}
const apiClient = axiosInstance;

const useFetchAllPostComments = ({ postId, pageSize }: PaginateProps) => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;

  return useInfiniteQuery<PostCommentListResponse, Error>({
    queryKey: ["postCommentList", postId],
    queryFn: async ({ pageParam = 0 }) => {
      const { data } = await apiClient.get<PostCommentListResponse>(
        `/post/${postId}/comment`,
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

export default useFetchAllPostComments;
