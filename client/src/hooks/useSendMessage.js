import { sendMessage } from "@/apis/message";
import { useMutation } from "@tanstack/react-query";

const useSendMessage = () => {
  return useMutation({
    mutationFn: sendMessage,
  });
};

export default useSendMessage;
