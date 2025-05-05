import { useInfiniteQuery } from "@tanstack/react-query";
import PostCommentListResponse from "../../entities/PostComment";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

interface PaginateProps {
  postImageId: number;
  pageSize: number;
}
const apiClient = axiosInstance;
const useFetchAllPostImageComments = ({
  postImageId,
  pageSize,
}: PaginateProps) => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;

  return useInfiniteQuery<PostCommentListResponse, Error>({
    queryKey: ["postImageCommentList", postImageId],
    queryFn: async ({ pageParam = 0 }) => {
      const { data } = await apiClient.get<PostCommentListResponse>(
        `/post/${postImageId}/image/comment`,
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

export default useFetchAllPostImageComments;
