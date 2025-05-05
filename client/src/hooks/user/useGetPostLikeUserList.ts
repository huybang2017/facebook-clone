import { useInfiniteQuery } from "@tanstack/react-query";
import PageResponse from "../../entities/PageResponse";
import { UserData } from "../../entities/User";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

const apiClient = axiosInstance;

interface UserList extends UserData {
  uniqueId: number;
}

export interface UserListResponseProps {
  userList: UserList[];
  pageResponse: PageResponse;
}

interface PaginateProps {
  postId: number;
  pageSize: number;
}

const useGetPostLikeUserList = ({ postId, pageSize }: PaginateProps) => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  return useInfiniteQuery<UserListResponseProps, Error>({
    queryKey: ["postLikeUserList", postId],
    queryFn: async ({ pageParam = 0 }) => {
      const { data } = await apiClient.get<UserListResponseProps>(
        `/post/${postId}/like/user/list`,
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
    enabled: !!jwtToken && !!postId,
  });
};

export default useGetPostLikeUserList;
