import { fetchAllNotifications } from "@/apis/notification";
import { useInfiniteQuery } from "@tanstack/react-query";

const useFetchNotifications = ({ userId, pageSize = 3 }) => {
  return useInfiniteQuery({
    queryKey: ["notificationList", userId],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await fetchAllNotifications(userId, pageParam, pageSize);
      return res.data;
    },
    getNextPageParam: (lastPage) => {
      const { pageResponse } = lastPage;
      const { pageNo, totalPages } = pageResponse;
      return pageNo + 1 < totalPages ? pageNo + 1 : undefined;
    },
    enabled: !!userId,
  });
};

export default useFetchNotifications;
