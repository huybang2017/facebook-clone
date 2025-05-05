import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

const apiClient = axiosInstance;
const useDeleteNotificationById = () => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const queryClient = useQueryClient();
  return useMutation(
    async (notificationId: number) =>
      await apiClient.delete(`/notifications/${notificationId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["notificationList"]);
      },
      onError: (error) => {
        console.error("Error deleting notification:", error);
      },
    }
  );
};

export default useDeleteNotificationById;
