import { SubmitHandler, useForm } from "react-hook-form";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { WriteCommentProps } from "./useWritePostComment";

const apiClient = axiosInstance;

const useWritePostImageComment = (postImageId: number) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const { register, handleSubmit, reset, setValue } =
    useForm<WriteCommentProps>();
  const [comment, setComment] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const mutation = useMutation(
    (formData: FormData) =>
      apiClient.post(`/post/${postImageId}/image/comment`, formData, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "multipart/form-data",
        },
      }),

    {
      onSuccess: () => {
        queryClient.invalidateQueries(["postImageCommentList", postImageId]);
        queryClient.invalidateQueries(["postImageCommentCount", postImageId]);
        setLoading(false);
        reset();
        setComment("");
        setImageFile(null);
        setImagePreview(null);
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

  const onSubmit: SubmitHandler<WriteCommentProps> = async (data) => {
    setLoading(true);
    const formData = new FormData();

    if (data.comment) {
      formData.append("comment", data.comment || "");
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
    comment,
    setComment,
    imageFile,
    setImageFile,
    setImagePreview,
    imagePreview,
  };
};

export default useWritePostImageComment;
