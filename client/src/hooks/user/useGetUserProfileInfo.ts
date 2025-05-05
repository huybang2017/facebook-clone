import { useToast } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { User } from "../../entities/User";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

const apiClient = axiosInstance;

const useGetUserProfileInfo = (userId: number) => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const navigate = useNavigate();
  const toast = useToast();
  return useQuery({
    queryKey: ["userProfile", userId],
    queryFn: async () => {
      const { data } = await apiClient.get<User>(`/user/profile/${userId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      return data;
    },
    onError: (error: any) => {
      navigate("/home");
      if (error.response?.data) {
        toast({
          title: "ERROR 404 USER NOT FOUND",
          description: error.response?.data,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    },
    enabled: !!jwtToken,
  });
};

export default useGetUserProfileInfo;
