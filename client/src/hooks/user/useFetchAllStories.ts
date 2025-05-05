import { useQuery } from "@tanstack/react-query";
import { StoryResponse } from "../../entities/Story";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

const apiClient = axiosInstance;

const useFetchAllStories = () => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  return useQuery({
    queryKey: ["stories"],
    queryFn: async () => {
      const { data } = await apiClient.get<StoryResponse[]>(`/story`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      return data;
    },
    keepPreviousData: true,
    enabled: !!jwtToken,
  });
};

export default useFetchAllStories;
