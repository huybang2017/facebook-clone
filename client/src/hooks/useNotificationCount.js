import { useQuery } from "@tanstack/react-query";
import { getNotificationCount } from "@/apis/notificationApi";

const useNotificationCount = (userId) => {
  return useQuery({
    queryKey: ["notificationCount", userId],
    queryFn: () => getNotificationCount(userId),
    enabled: !!userId,
  });
};

export default useNotificationCount;
