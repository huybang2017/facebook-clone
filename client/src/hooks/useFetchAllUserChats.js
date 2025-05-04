import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchAllUserChats } from "@/apis/chatApi";

const useFetchAllUserChats = (userId) => {
  return useInfiniteQuery(
    ["userChats", userId],
    ({ pageParam = 0 }) => fetchAllUserChats(userId, pageParam, 10),
    {
      enabled: !!userId,
      getNextPageParam: (lastPage) => {
        const { pageResponse } = lastPage;
        const { pageNo, totalPages } = pageResponse;
        return pageNo + 1 < totalPages ? pageNo + 1 : undefined;
      },
    }
  );
};

export default useFetchAllUserChats;

