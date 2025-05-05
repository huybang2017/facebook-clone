import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";
import { useState } from "react";

const apiClient = axiosInstance;

const useUnfriend = (userId: number) => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const mutation = useMutation(
    async (friendId: number) =>
      await apiClient.delete(`/friends/unfriend/${userId}/${friendId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }),
    {
      onSuccess: () => {
        setIsLoading(false);
        queryClient.invalidateQueries(["friendshipStatus"]);
        queryClient.invalidateQueries(["friendListCount"]);
        queryClient.invalidateQueries(["userFriendList"]);
      },
    }
  );

  return { mutation, isLoading, setIsLoading };
};

export default useUnfriend;
