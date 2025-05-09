import { getNotificationCount } from "@/apis/notification";
import { useQuery } from "@tanstack/react-query";

const useNotificationCount = (userId) => {
  return useQuery({
    queryKey: ["notificationCount", userId],
    queryFn: () => getNotificationCount(userId),
    enabled: !!userId,
  });
};

export default useNotificationCount;
