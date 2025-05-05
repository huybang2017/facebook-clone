import { Box, Flex, Text } from "@chakra-ui/react";
import { CiImageOff } from "react-icons/ci";

const NoAvailablePhotos = () => {
  return (
    <Box
      height="200px"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Flex flexDirection="column" alignItems="center">
        <CiImageOff size="50px" />
        <Text mt="10px" fontSize="xl">
          No available photos yet
        </Text>
      </Flex>
    </Box>
  );
};

export default NoAvailablePhotos;
