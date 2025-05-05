import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

const apiClient = axiosInstance;

export interface GetCountProps {
  count: number;
}
const useGetUserFriendListCount = (userId: number) => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  return useQuery({
    queryKey: ["friendListCount", userId],
    queryFn: async () => {
      const { data } = await apiClient.get<GetCountProps>(
        `/friends/count/${userId}`,
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

export default useGetUserFriendListCount;
