import { useInfiniteQuery } from "@tanstack/react-query";
import NotificationResponse from "../../entities/Notification";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";
import { PaginateProps } from "./useFetchAllFriendSuggestions";

const apiClient = axiosInstance;

const useFetchAllNotifications = ({ userId, pageSize }: PaginateProps) => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  return useInfiniteQuery<NotificationResponse, Error>({
    queryKey: ["notificationList", userId],
    queryFn: async ({ pageParam = 0 }) => {
      const { data } = await apiClient.get<NotificationResponse>(
        `/notifications/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          params: {
            pageNo: pageParam,
            pageSize: pageSize,
          },
        }
      );
      return data;
    },
    getNextPageParam: (lastPage) => {
      const { pageResponse } = lastPage;
      const { pageNo, totalPages } = pageResponse;
      return pageNo + 1 < totalPages ? pageNo + 1 : undefined;
    },
    keepPreviousData: true,
    enabled: !!jwtToken && !!userId,
  });
};

export default useFetchAllNotifications;
