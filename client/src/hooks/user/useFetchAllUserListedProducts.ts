import { useInfiniteQuery } from "@tanstack/react-query";
import ProductResponse from "../../entities/Product";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

const apiClient = axiosInstance;

interface PaginateProps {
  userId: number;
  pageSize: number;
}

const useFetchAllUserListedProducts = ({ userId, pageSize }: PaginateProps) => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;

  return useInfiniteQuery<ProductResponse, Error>({
    queryKey: ["listedUserProducts"],
    queryFn: async ({ pageParam = 0 }) => {
      const { data } = await apiClient.get<ProductResponse>(
        `/product/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          params: {
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
    enabled: !!jwtToken && !!userId,
  });
};

export default useFetchAllUserListedProducts;
