import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateGroupChatName } from "@/apis/chatApi";

const useUpdateGroupChatName = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateGroupChatName,
    onSuccess: () => {
      queryClient.invalidateQueries(["userChats"]);
    },
  });
};

export default useUpdateGroupChatName;
