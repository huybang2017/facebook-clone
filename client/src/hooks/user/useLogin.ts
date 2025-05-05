import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

interface FormData {
  email: string;
  password: string;
}

const apiClient = axiosInstance;

const useLogin = () => {
  const queryClient = useQueryClient();
  const { handleSubmit, setError, control } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setJwtToken, setRole } = useAuthQueryStore();

  const mutation = useMutation({
    mutationFn: (data: FormData) =>
      apiClient.post("/user/login", data).then((res) => res.data),

    onSuccess: (response) => {
      queryClient.invalidateQueries(["user"]);
      queryClient.invalidateQueries(["allPostList"]);
      queryClient.invalidateQueries(["userPostList"]);
      queryClient.invalidateQueries(["postNotificationCount"]);
      queryClient.invalidateQueries(["messages"]);
      queryClient.invalidateQueries(["userChatList"]);
      queryClient.invalidateQueries(["stories"]);
      const jwtToken = response.jwtToken;
      setJwtToken(jwtToken);
      const role = response.role;
      setRole(role);
      setLoading(false);
      if (role === "USER") {
        navigate("/home");
      }
    },
    onError: (error: any) => {
      setLoading(false);

      if (error.response?.data.errorMessage) {
        setError("password", {
          type: "server",
          message: error.response.data.errorMessage,
        });
      }
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setLoading(true);
    mutation.mutate(data);
  };

  return {
    handleSubmit,
    loading,
    onSubmit,
    control,
  };
};

export default useLogin;
