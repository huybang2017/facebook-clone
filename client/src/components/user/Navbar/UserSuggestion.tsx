import { Avatar, Flex, Text, useColorMode } from "@chakra-ui/react";
import pic from "../../../assets/profpic.jpeg";
import { UserDataModelList } from "../../../entities/User";
interface Props {
  user: UserDataModelList;
}

const UserSuggestion = ({ user }: Props) => {
  const { colorMode } = useColorMode();

  return (
    <>
      <Flex
        alignItems="center"
        padding="10px"
        _hover={{
          bg: colorMode === "dark" ? "gray.600" : "gray.200",
        }}
        cursor="pointer"
      >
        <Avatar src={user.profilePicture || pic} height="30px" width="30px" />

        <Text
          ml="10px"
          textTransform="capitalize"
          fontWeight="semibold"
          fontSize={{ base: "sm", md: "md" }}
          isTruncated={true}
        >
          {user.firstName} {user.lastName}
        </Text>
      </Flex>
    </>
  );
};

export default UserSuggestion;
