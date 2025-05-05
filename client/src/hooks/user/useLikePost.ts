import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

const apiClient = axiosInstance;

const useLikePost = () => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const queryClient = useQueryClient();
  return useMutation(
    async (postId: number) => {
      await apiClient.put(
        `/post/${postId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      return postId;
    },
    {
      onSuccess: (data) => {
        const postId = data;
        queryClient.invalidateQueries(["postLike", postId]);
        queryClient.invalidateQueries(["postLikeCount", postId]);
        queryClient.invalidateQueries(["postLikeUserList", postId]);
      },
    }
  );
};

export default useLikePost;
