import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";
import { LikeCountProps } from "./useGetPostLikeCount";

const apiClient = axiosInstance;

const useGetPostImageLikeCount = (postImageId: number) => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  return useQuery({
    queryKey: ["postImageLikeCount", postImageId],
    queryFn: async () => {
      const { data } = await apiClient.get<LikeCountProps>(
        `/post/${postImageId}/image/like/count`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      return data;
    },
    enabled: !!jwtToken && !!postImageId,
  });
};

export default useGetPostImageLikeCount;
