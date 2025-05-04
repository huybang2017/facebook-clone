import { useMutation } from "@tanstack/react-query";
import { chatUser } from "@/apis/chatApi";

const useChatUser = () => {
  return useMutation({
    mutationFn: chatUser,
  });
};

export default useChatUser;
