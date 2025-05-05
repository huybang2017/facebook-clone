import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

export interface ShareProps {
  content?: string;
}

const apiClient = axiosInstance;

const useSharePost = (postId: number) => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, setValue } = useForm<ShareProps>();
  const [isSuccessful, setIsSuccessful] = useState<boolean>(false);

  const mutation = useMutation(
    (data: ShareProps) =>
      apiClient.post(`/post/share/${postId}`, data, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["userPostList"]);
        queryClient.invalidateQueries(["postShareCount", postId]);
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

export default useSharePost;
