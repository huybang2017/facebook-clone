import { Button } from "@chakra-ui/react";
import useLogin from "../../../hooks/user/useLogin";
import PasswordInput from "../Input/PasswordInput";
import TextInput from "../Input/TextInput";

const Login = () => {
  const {
    handleSubmit,
    loading,
    onSubmit: onSubmitLogin,
    control,
  } = useLogin();
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit(onSubmitLogin)(event);
      }}
    >
      <TextInput
        control={control}
        name="email"
        loading={loading}
        placeholder="Email"
        label="Email"
        mb={4}
      />
      <PasswordInput
        control={control}
        name="password"
        loading={loading}
        placeholder="Password"
        label="Password"
      />
      <Button
        isLoading={loading}
        type="submit"
        width="100%"
        bg="#1877F2"
        _hover={{ bg: "#165BB7" }}
        mt={4}
      >
        Log In
      </Button>
    </form>
  );
};

export default Login;
