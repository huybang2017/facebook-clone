import { Card, Flex, Text } from "@chakra-ui/react";

import { MdOutlineCommentsDisabled } from "react-icons/md";

const NoAvailablePost = () => {
  return (
    <Card
      height="300px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      mt="10px"
    >
      <Flex flexDirection="column" alignItems="center">
        <MdOutlineCommentsDisabled size="50px" />
        <Text mt="10px" fontSize="xl">
          No available post yet
        </Text>
      </Flex>
    </Card>
  );
};

export default NoAvailablePost;
