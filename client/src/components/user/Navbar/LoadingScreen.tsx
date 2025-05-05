import { Box, Flex, Text, useColorMode } from "@chakra-ui/react";
import { FaFacebook } from "react-icons/fa6";
import { BsMeta } from "react-icons/bs";
const LoadingScreen = () => {
  const { colorMode } = useColorMode();
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      bg={colorMode === "dark" ? "gray.700" : "white"}
      height="100vh"
      position="relative"
    >
      <Box color="#1877F2">
        <FaFacebook size="80px" />
      </Box>
      <Flex
        position="absolute"
        bottom="50px"
        flexDirection="column"
        textAlign="center"
      >
        <Text fontSize="lg" color="gray.500">
          from
        </Text>
        <Flex alignItems="center" color="#1877F2">
          <BsMeta size="30px" />
          <Text fontSize="x-large" ml="5px" fontWeight="semibold">
            Meta
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default LoadingScreen;
