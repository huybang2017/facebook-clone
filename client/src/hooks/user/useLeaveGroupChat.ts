import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";
const apiClient = axiosInstance;

interface Props {
  chatId: number;
  userId: number;
  leaveReason: string;
}

const useLeaveGroupChat = () => {
  const { authStore } = useAuthQueryStore();
  const queryClient = useQueryClient();
  const jwtToken = authStore.jwtToken;
  return useMutation(
    async ({ chatId, userId, leaveReason }: Props) => {
      const response = await apiClient.post(
        `/chat/group/leave/${chatId}/${userId}/${leaveReason}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      return response;
    },
    {
      onSuccess: (_, data) => {
        const userId = data.userId;
        const chatId = data.chatId;
        queryClient.invalidateQueries(["chatById", chatId]);
        queryClient.invalidateQueries(["messages", chatId]);
        queryClient.invalidateQueries(["userChatList", userId]);
      },
    }
  );
};

export default useLeaveGroupChat;
