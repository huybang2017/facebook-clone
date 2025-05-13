import { chatUser } from "@/apis/chat";
import { useMutation } from "@tanstack/react-query";

const useChatUser = () => {
  return useMutation({
    mutationFn: chatUser,
  });
};

export default useChatUser;
