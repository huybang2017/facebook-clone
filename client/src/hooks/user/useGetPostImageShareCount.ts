import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";
import { CountProps } from "./useGetPostShareCount";

const apiClient = axiosInstance;
const useGetPostImageShareCount = (postImageId: number) => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  return useQuery({
    queryKey: ["postShareImageCount", postImageId],
    queryFn: async () => {
      const { data } = await apiClient.get<CountProps>(
        `/post/share/image/count/${postImageId}`,
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

export default useGetPostImageShareCount;
