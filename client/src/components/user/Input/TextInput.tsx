import { FormControl, Input, InputProps, Text } from "@chakra-ui/react";
import { Control, useController } from "react-hook-form";

export interface TextInputProps extends InputProps {
  control: Control<any>;
  name: string;
  loading: boolean;
  placeholder: string;
  label: string;
}

const TextInput = ({
  control,
  name,
  loading,
  placeholder,
  label,
  ...props
}: TextInputProps) => {
  const {
    formState: { errors },
  } = useController({ control, name });

  return (
    <FormControl isRequired>
      <Input
        {...control.register(name)}
        placeholder={placeholder}
        disabled={loading}
        {...props}
      />
      {errors[name] && (
        <Text color="red">{errors[name].message?.toString()}</Text>
      )}
    </FormControl>
  );
};

export default TextInput;
