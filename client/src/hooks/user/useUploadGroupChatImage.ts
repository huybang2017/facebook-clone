import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

const apiClient = axiosInstance;

interface Props {
  file: File;
}

const useUploadGroupChatImage = (chatId: number) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;

  return useMutation(
    async ({ file }: Props) => {
      const formData = new FormData();
      formData.append("file", file);

      const { data } = await apiClient.post(
        `/chat/group/upload/image/${chatId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["chatById", chatId]);
        queryClient.invalidateQueries(["userChatList"]);
      },
      onError: (error: any) => {
        if (error.response?.data.errorMessage) {
          toast({
            title: "Error uploading image.",
            description: error.response.data.errorMessage,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      },
    }
  );
};

export default useUploadGroupChatImage;
