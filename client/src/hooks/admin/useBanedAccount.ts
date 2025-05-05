import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

const useBanUser = () => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;

  return useMutation({
    mutationFn: async ({ userId, baned }: { userId: number; baned: boolean }) => {
      const { data } = await axiosInstance.post(`/user/${userId}/ban`,
        { baned },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      return data;
    },
  });
};

export default useBanUser;
