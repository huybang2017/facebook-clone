import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

export interface AddUserToGroupChatProps {
  userId: number[];
}

const apiClient = axiosInstance;

const useAddUserToGroupChat = (chatId: number) => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;

  return useMutation(async ({ userId }: AddUserToGroupChatProps) => {
    await apiClient.post(
      `/chat/group/add/user/${chatId}`,
      { userId },
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
  });
};

export default useAddUserToGroupChat;
