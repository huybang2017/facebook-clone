import { useQuery } from "@tanstack/react-query";
import { ChatModel } from "../../entities/Chat";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

const apiClient = axiosInstance;

const usesGetChatById = (chatId: number, userId: number) => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  return useQuery({
    queryKey: ["chatById", chatId, userId],
    queryFn: async () => {
      const { data } = await apiClient.get<ChatModel>(
        `/chat/get/${chatId}/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      return data;
    },
    enabled: !!jwtToken && !!chatId && !!userId,
  });
};

export default usesGetChatById;
