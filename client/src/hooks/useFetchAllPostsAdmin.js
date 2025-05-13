import { useQuery } from "@tanstack/react-query";
import axiosClient from "@/apis/axiosClient";

const useFetchAllPostsAdmin = ({ page, pageSize }) => {
  return useQuery({
    queryKey: ["allPostListWithContent", page],
    queryFn: async () => {
      const { data } = await axiosClient.get("/post/withContent", {
        params: {
          pageNo: page,
          pageSize: pageSize,
        },
      });
      return data;
    },
    keepPreviousData: true,
  });
};

export default useFetchAllPostsAdmin;
