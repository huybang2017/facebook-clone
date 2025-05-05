import { useQuery } from "@tanstack/react-query";
import Post from "../../entities/Post";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

const apiClient = axiosInstance;

const useGetPostById = (postId: number) => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  return useQuery({
    queryKey: ["postById", postId],
    queryFn: async () => {
      const { data } = await apiClient.get<Post>(`/post/get/${postId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      return data;
    },
    enabled: !!jwtToken && !!postId,
  });
};

export default useGetPostById;
