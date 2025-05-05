import { useInfiniteQuery } from "@tanstack/react-query";
import ProductResponse from "../../entities/Product";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";
import { SearchProps } from "./useSearchUser";

const apiClient = axiosInstance;

const useSearchProduct = ({ keyword, pageSize }: SearchProps) => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;

  return useInfiniteQuery<ProductResponse, Error>({
    queryKey: ["searchProductList", keyword, pageSize],
    queryFn: async ({ pageParam = 0 }) => {
      const { data } = await apiClient.get<ProductResponse>(`/product/search`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        params: {
          keyword: keyword,
          pageNo: pageParam,
          pageSize: pageSize,
        },
      });
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

export default useSearchProduct;
