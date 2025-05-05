import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";
import { GetCountProps } from "./useGetUserFriendListCount";

const apiClient = axiosInstance;

const useGetNotificationCount = (userId: number) => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  return useQuery({
    queryKey: ["postNotificationCount", userId],
    queryFn: async () => {
      const { data } = await apiClient.get<GetCountProps>(
        `/notifications/count/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      return data;
    },
    enabled: !!jwtToken && !!userId,
  });
};

export default useGetNotificationCount;
