import { Box } from "@chakra-ui/react";
import { StoryModel } from "../../../entities/Story";

interface Props {
  handleStoryClick: () => void;
  story: StoryModel;
  activeStory: StoryModel | null;
  progress: number;
}

const StorySelector = ({
  handleStoryClick,
  story,
  activeStory,
  progress,
}: Props) => {
  return (
    <Box
      height="7px"
      width="100%"
      bg="gray.200"
      borderRadius="12px"
      onClick={handleStoryClick}
      cursor="pointer"
      bgImage={
        activeStory?.storyId === story.storyId
          ? `linear-gradient(to right, #FFFFFF ${`${progress}%`}, gray.200 ${`${progress}%`})`
          : undefined
      }
      transition="background 0.1s linear"
    />
  );
};

export default StorySelector;
