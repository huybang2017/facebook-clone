import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";
import { useStoryStore } from "../../store/story-store";

interface CreateStoryProps {
  text?: string;
  file?: File;
}

const apiClient = axiosInstance;

const useCreateStory = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const { register, handleSubmit, reset, setValue } =
    useForm<CreateStoryProps>();
  const [text, setText] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isTextStory, setIsTextStory] = useState<boolean>(false);
  const [isPhotoStory, setIsPhotoStory] = useState<boolean>(false);
  const { onClose } = useStoryStore();
  const mutation = useMutation(
    (formData: FormData) =>
      apiClient.post(`/story/create`, formData, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "multipart/form-data",
        },
      }),

    {
      onSuccess: () => {
        queryClient.invalidateQueries(["stories"]);
        setLoading(false);
        reset();
        setText("");
        setImageFile(null);
        setImagePreview(null);
        setIsTextStory(false);
        setIsPhotoStory(false);
        onClose();
      },
      onError: (error: any) => {
        setLoading(false);

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

  const onSubmit: SubmitHandler<CreateStoryProps> = async (data) => {
    setLoading(true);
    const formData = new FormData();

    if (data.text) {
      formData.append("text", data.text || "");
    }
    if (data.file) {
      formData.append("file", data.file);
      setImageFile(data.file);
    }
    await mutation.mutate(formData);
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    loading,
    setValue,
    text,
    setText,
    imageFile,
    setImageFile,
    setImagePreview,
    imagePreview,
    isTextStory,
    setIsTextStory,
    isPhotoStory,
    setIsPhotoStory,
  };
};

export default useCreateStory;
