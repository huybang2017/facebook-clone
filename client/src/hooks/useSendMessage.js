import { useMutation } from "@tanstack/react-query";
import { sendMessage } from "@/apis/chat";

const useSendMessage = () => {
  return useMutation({
    mutationFn: sendMessage,
  });
};

export default useSendMessage;
