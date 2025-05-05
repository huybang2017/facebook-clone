import { useQuery } from "@tanstack/react-query";
import { PostComment } from "../../entities/PostComment";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

const apiClient = axiosInstance;

const useGetLastPostComment = (postId: number) => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  return useQuery({
    queryKey: ["lastComment", postId],
    queryFn: async () => {
      const { data } = await apiClient.get<PostComment>(
        `/post/${postId}/comment/last`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      return data;
    },
    enabled: !!jwtToken && !!postId,
  });
};

export default useGetLastPostComment;
