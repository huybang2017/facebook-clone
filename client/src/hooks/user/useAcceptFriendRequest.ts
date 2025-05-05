import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

const apiClient = axiosInstance;

const useAcceptFriendRequest = () => {
  const queryClient = useQueryClient();
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const mutation = useMutation(
    async (strangerUserId: number) => {
      await apiClient.post(
        `/friends/accept/${strangerUserId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
    },
    {
      onSuccess: (_, strangerUserId) => {
        setIsLoading(false);
        queryClient.invalidateQueries(["friendRequestList"]);
        queryClient.invalidateQueries(["friendRequestStatus", strangerUserId]);
        queryClient.invalidateQueries(["friendshipStatus", strangerUserId]);
        queryClient.invalidateQueries(["userFriendList"]);
        queryClient.invalidateQueries(["notificationList"]);
      },
    }
  );

  return { mutation, isLoading, setIsLoading };
};

export default useAcceptFriendRequest;
