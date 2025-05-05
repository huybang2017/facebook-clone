import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

const apiClient = axiosInstance;

export interface CountProps {
  sharedPostCount: number;
}

const useGetPostShareCount = (postId: number) => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  return useQuery({
    queryKey: ["postShareCount", postId],
    queryFn: async () => {
      const { data } = await apiClient.get<CountProps>(
        `/post/share/count/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      return data;
    },
    enabled: !!jwtToken && !!postId,
  });
};

export default useGetPostShareCount;
