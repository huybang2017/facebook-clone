import { useInfiniteQuery } from "@tanstack/react-query";
import ProductResponse from "../../entities/Product";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

const apiClient = axiosInstance;

interface PaginateProps {
  category: string;
  pageSize: number;
}

const useFetchAllProductsByCategory = ({
  category,
  pageSize,
}: PaginateProps) => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;

  return useInfiniteQuery<ProductResponse, Error>({
    queryKey: ["categoryProduct", category],
    queryFn: async ({ pageParam = 0 }) => {
      const { data } = await apiClient.get<ProductResponse>(
        `/product/${category}`,
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
    enabled: !!jwtToken && !!category,
  });
};

export default useFetchAllProductsByCategory;
