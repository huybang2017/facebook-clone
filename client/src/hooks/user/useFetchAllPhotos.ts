import { useInfiniteQuery } from "@tanstack/react-query";
import PhotoListResponse from "../../entities/PostImage";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

interface PaginateProps {
  userId: number;
  pageSize: number;
}

const apiClient = axiosInstance;

const useFetchAllPhotos = ({ userId, pageSize }: PaginateProps) => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  return useInfiniteQuery<PhotoListResponse, Error>({
    queryKey: ["profilePhotoList", userId],
    queryFn: async ({ pageParam = 0 }) => {
      const { data } = await apiClient.get<PhotoListResponse>(
        `/post/image/${userId}`,
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
    enabled: !!jwtToken,
  });
};

export default useFetchAllPhotos;
