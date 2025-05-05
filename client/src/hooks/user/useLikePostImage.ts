import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

const apiClient = axiosInstance;
const useLikePostImage = () => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const queryClient = useQueryClient();
  return useMutation(
    async (postImageId: number) => {
      await apiClient.put(
        `/post/${postImageId}/image/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      return postImageId;
    },
    {
      onSuccess: (data) => {
        const postImageId = data;
        queryClient.invalidateQueries(["postImageLike", postImageId]);
        queryClient.invalidateQueries(["postImageLikeCount", postImageId]);
        queryClient.invalidateQueries(["postLikeImageUserList", postImageId]);
      },
    }
  );
};

export default useLikePostImage;
