import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

const apiClient = axiosInstance;

const useMarkAsRead = () => {
  const { authStore } = useAuthQueryStore();
  const queryClient = useQueryClient();
  const jwtToken = authStore.jwtToken;
  return useMutation(
    async (notificationId: number) => {
      await apiClient.post(
        `/notifications/${notificationId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["notificationList"]);
        queryClient.invalidateQueries(["postNotificationCount"]);
      },
    }
  );
};

export default useMarkAsRead;
