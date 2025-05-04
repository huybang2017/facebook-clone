import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGroupChat } from "@/apis/chatApi";

const useCreateGroupChat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createGroupChat,
    onSuccess: () => {
      queryClient.invalidateQueries(["userChats"]);
    },
  });
};

export default useCreateGroupChat;
