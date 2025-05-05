import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";
export interface LikeCountProps {
  postLikeCount: number;
}

const apiClient = axiosInstance;

const useGetPostLikeCount = (postId: number) => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  return useQuery({
    queryKey: ["postLikeCount", postId],
    queryFn: async () => {
      const { data } = await apiClient.get<LikeCountProps>(
        `/post/${postId}/like/count`,
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

export default useGetPostLikeCount;
