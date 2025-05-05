import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";
import { ShareProps } from "./useSharePost";

const apiClient = axiosInstance;

const useSharePostImage = (postId: number, postImageId: number) => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, setValue } = useForm<ShareProps>();
  const [isSuccessful, setIsSuccessful] = useState<boolean>(false);

  const mutation = useMutation(
    (data: ShareProps) =>
      apiClient.post(`/post/share/image/${postId}/${postImageId}`, data, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["postShareImageCount", postImageId]);
        queryClient.invalidateQueries(["userPostList"]);
        queryClient.invalidateQueries(["allPostList"]);
        setLoading(false);
        setIsSuccessful(true);
        reset();
      },
      onError: () => {
        setLoading(false);
        setIsSuccessful(false);
      },
    }
  );

  const onSubmit: SubmitHandler<ShareProps> = async (data) => {
    setLoading(true);
    mutation.mutate(data);
  };

  return {
    loading,
    register,
    handleSubmit,
    onSubmit,
    setValue,
    isSuccessful,
    setIsSuccessful,
  };
};

export default useSharePostImage;
