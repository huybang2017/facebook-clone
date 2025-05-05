import {
  Box,
  Card,
  IconButton,
  Image,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import pic from "../../../assets/profpic.jpeg";
import { useStoryStore } from "../../../store/story-store";
import { useUserStore } from "../../../store/user-store";

const CreateStoryCard = () => {
  const { colorMode } = useColorMode();
  const { profilePicture } = useUserStore();
  const { onOpen } = useStoryStore();
  return (
    <>
      <Card
        height="200px"
        minWidth="120px"
        maxWidth="120px"
        mt="10px"
        overflow="hidden"
        cursor="pointer"
        onClick={onOpen}
        userSelect="none"
      >
        <Box textAlign="center">
          <Image
            src={profilePicture || pic}
            height="150px"
            objectFit="cover"
            _hover={{
              transform: "scale(1.03)",
              transition: "transform .15s ease-in",
            }}
          />
          <IconButton
            aria-label="story"
            icon={<FiPlus size="25px" />}
            bg={"#1877F2"}
            _hover={{
              bg: "#165BB7",
            }}
            isRound
            size="lg"
            position="relative"
            bottom="24px"
            borderWidth="5px"
            borderColor={colorMode === "dark" ? "gray.700" : "white"}
            onClick={onOpen}
          />
          <Text position="relative" bottom="25px" fontWeight="semibold">
            Create Story
          </Text>
        </Box>
      </Card>
    </>
  );
};

export default CreateStoryCard;
