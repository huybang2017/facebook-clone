import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";
import { UserListResponseProps } from "./useGetPostLikeUserList";

export interface SearchProps {
  keyword: string;
  pageSize: number;
}

const apiClient = axiosInstance;

const useSearchUser = ({ keyword, pageSize }: SearchProps) => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;

  return useInfiniteQuery<UserListResponseProps, Error>({
    queryKey: ["searchList", keyword, pageSize],
    queryFn: async ({ pageParam = 0 }) => {
      const { data } = await apiClient.get<UserListResponseProps>(
        `/user/search`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          params: {
            keyword: keyword,
            pageNo: pageParam,
            pageSize: pageSize,
          },
        }
      );
      return data;
    },
    getNextPageParam: (lastPage) => {
      const { pageResponse } = lastPage;
      const { pageNo, totalPages } = pageResponse;
      return pageNo + 1 < totalPages ? pageNo + 1 : undefined;
    },
    keepPreviousData: true,
    enabled: !!jwtToken && !!keyword,
  });
};

export default useSearchUser;
