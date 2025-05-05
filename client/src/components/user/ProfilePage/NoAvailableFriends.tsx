import { Box, Flex, Text } from "@chakra-ui/react";
import { TbFriendsOff } from "react-icons/tb";

const NoAvailableFriends = () => {
  return (
    <Box
      height="200px"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Flex flexDirection="column" alignItems="center">
        <TbFriendsOff size="50px" />
        <Text mt="10px" fontSize="xl">
          No friends yet! Start connecting with others!
        </Text>
      </Flex>
    </Box>
  );
};

export default NoAvailableFriends;
