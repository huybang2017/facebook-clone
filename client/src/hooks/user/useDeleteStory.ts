import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

const apiClient = axiosInstance;
const useDeleteStory = () => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const queryClient = useQueryClient();

  return useMutation(
    async (storyId: number) =>
      await apiClient.delete(`/story/delete/${storyId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["stories"]);
      },
    }
  );
};

export default useDeleteStory;
