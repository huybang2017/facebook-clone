import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

interface UploadUserImageProps {
  file?: File;
  description?: string;
}

const apiClient = axiosInstance;

const useUploadUserImage = (imageType: string) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const { register, handleSubmit, reset, setValue } =
    useForm<UploadUserImageProps>();
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSuccessful, setIsSuccessful] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const mutation = useMutation(
    (formData: FormData) =>
      apiClient.post(`/user/profile/picture/upload/${imageType}`, formData, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "multipart/form-data",
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["user"]);
        queryClient.invalidateQueries(["userPostList"]);
        queryClient.invalidateQueries(["userProfile"]);
        queryClient.invalidateQueries(["postCommentList"]);
        setLoading(false);
        reset();
        setDescription("");
        setImageFile(null);
        setImagePreview(null);
        setIsSuccessful(true);
      },
      onError: (error: any) => {
        setIsSuccessful(false);
        setLoading(false);
        if (error.response?.data.errorMessage) {
          toast({
            title: "Error uploading image.",
            description: error.response.data.errorMessage,
            status: "error",
            duration: 4000,
            isClosable: true,
          });
        }
      },
    }
  );
  const onSubmit: SubmitHandler<UploadUserImageProps> = async (data) => {
    setLoading(true);
    const formData = new FormData();

    if (data.description) {
      formData.append("description", data.description || "");
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
    description,
    setDescription,
    imageFile,
    setImageFile,
    setImagePreview,
    imagePreview,
    isSuccessful,
    setIsSuccessful,
  };
};

export default useUploadUserImage;
