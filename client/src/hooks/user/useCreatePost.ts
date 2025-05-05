import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDisclosure, useToast } from "@chakra-ui/react";

interface CreatePostProps {
  content?: string;
  file?: FileList;
}

const apiClient = axiosInstance;

const useCreatePost = (userId: number) => {
  const toast = useToast();
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, setValue } =
    useForm<CreatePostProps>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [post, setPost] = useState<string>("");
  const [imageFile, setImageFile] = useState<FileList | null>(null);
  const [imagePreview, setImagePreview] = useState<string[] | null>(null);
  const mutation = useMutation(
    (formData: FormData) =>
      apiClient.post(`/post/save/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "multipart/form-data",
        },
      }),

    {
      onSuccess: () => {
        queryClient.invalidateQueries(["userPostList"]);
        queryClient.invalidateQueries(["allPostList"]);
        setLoading(false);
        reset();
        setPost("");
        setImageFile(null);
        setImagePreview(null);
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

  const onSubmit: SubmitHandler<CreatePostProps> = async (data) => {
    setLoading(true);
    const formData = new FormData();

    if (data.content) {
      formData.append("post", data.content || "");
    }
    if (data.file && data.file.length > 0) {
      Array.from(data.file).forEach((file) => {
        formData.append("file", file);
      });
      setImageFile(data.file);
    }

    await mutation.mutate(formData);
  };

  return {
    onSubmit,
    register,
    handleSubmit,
    loading,
    isOpen,
    onOpen,
    onClose,
    post,
    setPost,
    imageFile,
    setImageFile,
    setValue,
    setImagePreview,
    imagePreview,
  };
};

export default useCreatePost;
