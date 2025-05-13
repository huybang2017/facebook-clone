import { useQuery } from "@tanstack/react-query";
import axiosClient from "@/apis/axiosClient";

const useFetchAllUsers = ({ page, pageSize }) => {
  return useQuery({
    queryKey: ["allUserList", page],
    queryFn: async () => {
      const { data } = await axiosClient.get("/user/users", {
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

export default useFetchAllUsers;
