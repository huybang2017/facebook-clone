import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

const apiClient = axiosInstance;

export interface UpdateGroupChatNameProps {
  chatId: number;
  name: string;
}

const useUpdateGroupChatName = () => {
  const queryClient = useQueryClient();
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;

  return useMutation(
    async ({ chatId, name }: UpdateGroupChatNameProps) => {
      const response = await apiClient.post(
        `/chat/group/change/name`,
        { chatId, name },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      return response.data;
    },
    {
      onSuccess: (_, data) => {
        queryClient.invalidateQueries(["chatById", data.chatId]);
        queryClient.invalidateQueries(["userChatList"]);
      },
    }
  );
};

export default useUpdateGroupChatName;
