import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

export interface FriendshipStatusProps {
  status: string;
}

const apiClient = axiosInstance;

const useGetFriendshipStatus = (friendId: number) => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  return useQuery({
    queryKey: ["friendshipStatus", friendId],
    queryFn: async () => {
      const { data } = await apiClient.get<FriendshipStatusProps>(
        `/friends/status/${friendId}`,
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

export default useGetFriendshipStatus;
