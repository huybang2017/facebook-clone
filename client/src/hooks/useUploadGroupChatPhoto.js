import { useMutation } from "@tanstack/react-query";
import { uploadGroupChatPhoto } from "@/apis/chatApi";

const useUploadGroupChatPhoto = () => {
  return useMutation({
    mutationFn: ({ chatId, file }) => uploadGroupChatPhoto(chatId, file),
  });
};

export default useUploadGroupChatPhoto;
