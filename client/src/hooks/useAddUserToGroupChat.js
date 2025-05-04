import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUserToGroupChat } from "@/apis/chatApi";

const useAddUserToGroupChat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ chatId, data }) => addUserToGroupChat(chatId, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["chatDetail"]);
    },
  });
};

export default useAddUserToGroupChat;
