import { useAuthQueryStore } from "../../store/auth-store";
import { FriendshipStatusProps } from "./useGetFriendshipStatus";
import { axiosInstance } from "../../services/api-client";
import { useQuery } from "@tanstack/react-query";

const apiClient = axiosInstance;

const useGetFriendRequestStatus = (friendId: number) => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  return useQuery({
    queryKey: ["friendRequestStatus", friendId],
    queryFn: async () => {
      const { data } = await apiClient.get<FriendshipStatusProps>(
        `/friends/status/request/${friendId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      return data;
    },
    enabled: !!jwtToken && !!friendId,
  });
};

export default useGetFriendRequestStatus;
