import { useQuery } from "@tanstack/react-query";
import { ProductModel } from "../../entities/Product";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

const apiClient = axiosInstance;

const usesGetProductById = (productId: number) => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  return useQuery({
    queryKey: ["productById", productId],
    queryFn: async () => {
      const { data } = await apiClient.get<ProductModel>(
        `/product/find/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      return data;
    },
    enabled: !!jwtToken && !!productId,
  });
};

export default usesGetProductById;
