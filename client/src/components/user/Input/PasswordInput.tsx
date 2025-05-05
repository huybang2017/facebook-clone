import {
  FormControl,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useController } from "react-hook-form";
import { IoIosEye } from "react-icons/io";
import { RiEyeCloseLine } from "react-icons/ri";
import { TextInputProps } from "./TextInput";

const PasswordInput = ({
  control,
  name,
  loading,
  placeholder,
  label,
  ...props
}: TextInputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };

  const {
    formState: { errors },
  } = useController({ control, name });

  return (
    <FormControl isRequired>
      <InputGroup>
        <Input
          {...control.register(name)}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          disabled={loading}
          {...props}
        />
        <InputRightElement>
          <IconButton
            aria-label={label}
            icon={
              showPassword ? (
                <IoIosEye size="25px" />
              ) : (
                <RiEyeCloseLine size="25px" />
              )
            }
            onClick={handleShowPasswordClick}
            bg="transparent"
            _hover={{ bg: "transparent" }}
            mr="15px"
          />
        </InputRightElement>
      </InputGroup>
      {errors[name] && (
        <Text color="red">{errors[name].message?.toString()}</Text>
      )}
    </FormControl>
  );
};

export default PasswordInput;
