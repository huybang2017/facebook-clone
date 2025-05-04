import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markAsRead } from "@/apis/notificationApi";

const useMarkAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries(["notificationList"]);
      queryClient.invalidateQueries(["notificationCount"]);
    },
    onError: (err) => {
      console.error("Error marking as read:", err);
    },
  });
};

export default useMarkAsRead;
