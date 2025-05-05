import { useQuery } from "@tanstack/react-query";
import PostListResponse from "../../entities/Post";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

const apiClient = axiosInstance;

interface PaginateProps {
  page: number;
  pageSize: number;
}

const useFetchAllPostsAdmin = ({ page, pageSize }: PaginateProps) => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;

  return useQuery<PostListResponse, Error>({
    queryKey: ["allPostListWithContent", page],
    queryFn: async () => {
      const { data } = await apiClient.get<PostListResponse>("/post/withContent", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        params: {
          pageNo: page,
          pageSize: pageSize,
        },
      });
      return data;
    },
    keepPreviousData: true,
    enabled: !!jwtToken,
  });
};

export default useFetchAllPostsAdmin;

