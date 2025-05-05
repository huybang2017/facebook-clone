import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

const apiClient = axiosInstance;

const useDeleteFriendRequest = (userId: number) => {
  const queryClient = useQueryClient();
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const mutation = useMutation(
    async (strangerId: number) => {
      await apiClient.delete(`/friends/delete/${userId}/${strangerId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
    },
    {
      onSuccess: (_, strangerId) => {
        setIsLoading(false);
        queryClient.invalidateQueries(["friendRequestList"]);
        queryClient.invalidateQueries(["friendRequestStatus", strangerId]);
        queryClient.invalidateQueries(["friendshipStatus", strangerId]);
        queryClient.invalidateQueries(["notificationList", userId]);
      },
    }
  );

  return { mutation, isLoading, setIsLoading };
};

export default useDeleteFriendRequest;
