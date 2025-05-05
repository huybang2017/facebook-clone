import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";
import { LikeProps } from "./useGetPostLike";

const apiClient = axiosInstance;

const useGetPostImageLike = (postImageId: number) => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  return useQuery({
    queryKey: ["postImageLike", postImageId],
    queryFn: async () => {
      const { data } = await apiClient.get<LikeProps>(
        `/post/${postImageId}/image/like`,
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

export default useGetPostImageLike;
