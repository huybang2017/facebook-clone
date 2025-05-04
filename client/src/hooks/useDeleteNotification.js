import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNotification } from "@/apis/notificationApi";

const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNotification,
    onSuccess: () => {
      queryClient.invalidateQueries(["notificationList"]);
      queryClient.invalidateQueries(["notificationCount"]);
    },
    onError: (err) => {
      console.error("Error deleting notification:", err);
    },
  });
};

export default useDeleteNotification;
