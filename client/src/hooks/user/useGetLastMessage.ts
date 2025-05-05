import { useQuery } from "@tanstack/react-query";
import MessageModel from "../../entities/Message";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

const apiClient = axiosInstance;

const useGetLastMessage = (chatId: number) => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  return useQuery({
    queryKey: ["lastMessage", chatId],
    queryFn: async () => {
      const { data } = await apiClient.get<MessageModel>(
        `/chat/message/last/${chatId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      return data;
    },
    enabled: !!jwtToken && !!chatId,
  });
};

export default useGetLastMessage;
