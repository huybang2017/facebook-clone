import { fetchAllNotifications } from "@/apis/notification";
import { useInfiniteQuery } from "@tanstack/react-query";

const useNotificationList = ({ userId, pageSize = 10 }) => {
  return useInfiniteQuery({
    queryKey: ["notificationList", userId],
    queryFn: ({ pageParam = 0 }) =>
      fetchAllNotifications({ userId, pageParam, pageSize }),
    getNextPageParam: (lastPage) => {
      const { pageResponse } = lastPage;
      const { pageNo, totalPages } = pageResponse;
      return pageNo + 1 < totalPages ? pageNo + 1 : undefined;
    },
    enabled: !!userId,
  });
};

export default useNotificationList;

