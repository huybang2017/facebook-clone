import { Flex, Text } from "@chakra-ui/react";
import { BsFillPeopleFill } from "react-icons/bs";

const Instruction = () => {
  return (
    <Flex
      width="100%"
      height="93vh"
      position="relative"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <BsFillPeopleFill size="150px" />
      <Text fontSize="3xl" fontWeight="bold">
        Select people's name to preview their profile.
      </Text>
    </Flex>
  );
};

export default Instruction;
