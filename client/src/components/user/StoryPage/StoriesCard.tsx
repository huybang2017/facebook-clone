import {
  Avatar,
  Box,
  Card,
  Flex,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { FaPause, FaPlay } from "react-icons/fa6";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoTrashOutline } from "react-icons/io5";
import ReactTimeAgo from "react-time-ago";
import pic from "../../../assets/profpic.jpeg";
import { StoryModel } from "../../../entities/Story";
import useDeleteStory from "../../../hooks/user/useDeleteStory";
import { useStoryStore } from "../../../store/story-store";
import { useUserStore } from "../../../store/user-store";
import StorySelector from "./StorySelector";
import { useNavigate } from "react-router-dom";

interface Props {
  activeStory: StoryModel | null;
  setActiveStory: (value: StoryModel) => void;
  setNextStoryIndex: (value: number) => void;
  progress: number;
  setProgress: (value: number) => void;
  handlePauseStoryClick: () => void;
  isPaused: boolean;
  setIsPaused: (value: boolean) => void;
}

const StoriesCard = ({
  activeStory,
  setActiveStory,
  setNextStoryIndex,
  progress,
  setProgress,
  handlePauseStoryClick,
  isPaused,
  setIsPaused,
}: Props) => {
  const { activeUser } = useStoryStore();
  const time = activeStory?.timestamp ? new Date(activeStory.timestamp) : null;
  const { mutate: deleteStory } = useDeleteStory();
  const { userId } = useUserStore();
  const handleDeleteStoryClick = () => {
    if (activeStory) {
      deleteStory(activeStory?.storyId);
    }
  };

  const handleStoryClick = (index: number) => {
    if (!activeUser?.storyModels) {
      return;
    }
    setNextStoryIndex(index);
    setActiveStory(activeUser?.storyModels[index]);
    setProgress(0);
    setIsPaused(false);
  };

  const navigate = useNavigate();

  const handleNavigateClick = () => {
    navigate(`/profile/${activeUser?.userId}`);
  };

  return (
    <>
      <Card
        bg={
          // "#262626"
          "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)"
        }
        height="90%"
        width={{ base: "90%", md: "80%", lg: "90%", xl: "85%" }}
        display="flex"
        justifyContent="center"
        alignItems="center"
        overflow="hidden"
        position="relative"
      >
        <Flex
          position="absolute"
          top="0"
          flexDirection="row"
          width="100%"
          display="flex"
          justifyContent="space-evenly"
          padding={3}
          gap={1}
        >
          {activeUser?.storyModels.map((story, index) => (
            <StorySelector
              key={story.storyId}
              story={story}
              handleStoryClick={() => handleStoryClick(index)}
              activeStory={activeStory}
              progress={activeStory?.storyId === story.storyId ? progress : 0}
            />
          ))}
        </Flex>
        <Box>
          <Flex alignItems="center" position="absolute" top="7" left="3">
            <Avatar
              src={activeUser?.profilePicture || pic}
              cursor="pointer"
              height="45px"
              width="45px"
              onClick={handleNavigateClick}
            />
            <Flex flexDirection="column">
              <Text
                ml="10px"
                textTransform="capitalize"
                fontWeight="semibold"
                onClick={handleNavigateClick}
                cursor="pointer"
              >
                {activeUser?.firstName} {activeUser?.lastName}
              </Text>
              <Text ml="10px" fontSize="sm">
                {time && <ReactTimeAgo date={time} locale="en-US" />}
              </Text>
            </Flex>
          </Flex>
          <Flex position="absolute" top="8" right="3" alignItems="center">
            <Box onClick={handlePauseStoryClick} cursor="pointer" mr="5px">
              {isPaused ? <FaPlay size="20px" /> : <FaPause size="20px" />}
            </Box>
            {activeUser?.userId === userId && (
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<HiDotsHorizontal size="24px" />}
                  variant="none"
                  ml="5px"
                />
                <MenuList>
                  <MenuItem
                    paddingBottom={2}
                    paddingTop={2}
                    onClick={handleDeleteStoryClick}
                  >
                    <IoTrashOutline size="25px" />
                    <Text ml="10px" fontSize="lg" fontWeight="semibold">
                      Delete Story
                    </Text>
                  </MenuItem>
                </MenuList>
              </Menu>
            )}
          </Flex>
          <Flex
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <Text
              fontSize={{ base: "md", md: "x-large" }}
              color="black"
              textTransform="uppercase"
              textAlign="center"
            >
              {activeStory?.text}
            </Text>
            <Image src={activeStory?.storyImage} />
          </Flex>
        </Box>
      </Card>
    </>
  );
};

export default StoriesCard;
