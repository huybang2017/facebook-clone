import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

const apiClient = axiosInstance;
const useDeletePost = () => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const queryClient = useQueryClient();

  return useMutation(
    async (postId: number) =>
      await apiClient.delete(`/post/delete/${postId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["userPostList"]);
        queryClient.invalidateQueries(["allPostList"]);
      },
    }
  );
};

export default useDeletePost;
