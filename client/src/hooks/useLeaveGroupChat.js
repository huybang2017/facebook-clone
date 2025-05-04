import { useMutation, useQueryClient } from "@tanstack/react-query";
import { leaveGroupChat } from "@/apis/chatApi";

const useLeaveGroupChat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ chatId, userId, leaveReason }) =>
      leaveGroupChat(chatId, userId, leaveReason),
    onSuccess: () => {
      queryClient.invalidateQueries(["userChats"]);
    },
  });
};

export default useLeaveGroupChat;

