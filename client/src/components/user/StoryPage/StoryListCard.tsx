import {
  Avatar,
  Flex,
  IconButton,
  Spacer,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import ReactTimeAgo from "react-time-ago";
import pic from "../../../assets/profpic.jpeg";
import { StoryResponse } from "../../../entities/Story";
import { useStoryStore } from "../../../store/story-store";

interface Props {
  story: StoryResponse;
  storyByUser?: boolean;
  handleUserClick: () => void;
}

const StoryListCard = ({ story, storyByUser, handleUserClick }: Props) => {
  const { colorMode } = useColorMode();
  const { onOpen } = useStoryStore();
  const time = new Date(story.storyModels[0].timestamp);
  const { activeUser } = useStoryStore();
  return (
    <>
      <Flex
        alignItems="center"
        bg={
          activeUser?.userId === story.userId
            ? colorMode === "dark"
              ? "#303030"
              : "gray.200"
            : colorMode === "dark"
            ? "gray.700"
            : "white"
        }
        _hover={{
          bg: colorMode === "dark" ? "#303030" : "gray.100",
        }}
        padding={2}
        cursor="pointer"
        borderRadius="5px"
        onClick={handleUserClick}
      >
        <Avatar
          src={story.profilePicture || pic}
          cursor="pointer"
          height="60px"
          width="60px"
        />
        <Flex flexDirection="column" ml="10px">
          <Text fontWeight="semibold" textTransform="capitalize">
            {story.firstName} {story.lastName}
          </Text>
          <Text color="gray.500">
            <ReactTimeAgo date={time} locale="en-US" />
          </Text>
        </Flex>
        {storyByUser && (
          <>
            <Spacer />
            <IconButton
              aria-label="story"
              icon={<FiPlus size="25px" />}
              color="#1877F2"
              isRound
              height="60px"
              width="60px"
              onClick={onOpen}
            />
          </>
        )}
      </Flex>
    </>
  );
};

export default StoryListCard;
