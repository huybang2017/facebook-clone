import { useMutation } from "@tanstack/react-query";
import axiosClient from "@/apis/axiosClient";

const useBanUser = () => {
  return useMutation({
    mutationFn: async ({ userId, baned }) => {
      const { data } = await axiosClient.post(`/user/${userId}/ban`, {
        baned,
      });
      return data;
    },
  });
};

export default useBanUser;
