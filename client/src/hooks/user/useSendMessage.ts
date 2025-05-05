import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

export interface SendMessageProps {
  text: string;
  chatId: number;
}

const apiClient = axiosInstance;

const useSendMessage = () => {
  const queryClient = useQueryClient();
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;

  return useMutation(
    async ({ text, chatId }: SendMessageProps) => {
      const response = await apiClient.post(
        "/chat/message",
        { text, chatId },
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
        const chatId = data.chatId;
        queryClient.invalidateQueries(["messages", chatId]);
      },
      onError: (error) => {
        console.error("Message sending failed:", error);
      },
    }
  );
};

export default useSendMessage;
