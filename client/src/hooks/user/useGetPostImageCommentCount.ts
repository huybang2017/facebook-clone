import { useQuery } from "@tanstack/react-query";
import { useAuthQueryStore } from "../../store/auth-store";
import { axiosInstance } from "../../services/api-client";
import { CommentCountProps } from "./useGetPostCommentCount";

const apiClient = axiosInstance;

const useGetPostImageCommentCount = (postImageId: number) => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  return useQuery({
    queryKey: ["postImageCommentCount", postImageId],
    queryFn: async () => {
      const { data } = await apiClient.get<CommentCountProps>(
        `/post/${postImageId}/image/comment/count`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      return data;
    },
    enabled: !!jwtToken && !!postImageId,
  });
};

export default useGetPostImageCommentCount;
