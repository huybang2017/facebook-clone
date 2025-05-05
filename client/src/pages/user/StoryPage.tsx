import {
  Box,
  Card,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Show,
  Skeleton,
  Text,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaFacebook } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import NextButton from "../../components/user/Buttons/NextButton";
import StoriesCard from "../../components/user/StoryPage/StoriesCard";
import StoryListCard from "../../components/user/StoryPage/StoryListCard";
import { StoryModel } from "../../entities/Story";
import useFetchAllStories from "../../hooks/user/useFetchAllStories";
import { useStoryStore } from "../../store/story-store";
import { useUserStore } from "../../store/user-store";

const StoryPage = () => {
  const { colorMode } = useColorMode();
  const { onOpen } = useStoryStore();
  const navigate = useNavigate();
  const handleNavigateClick = () => {
    navigate("/home");
  };
  const { userId } = useUserStore();
  const { data: fetchAllStories, isLoading } = useFetchAllStories();
  const array = [1, 2, 3, 4, 5];

  const storyByUser = fetchAllStories?.some((id) => id.userId === userId);
  const isSmallScreen = useBreakpointValue({ base: true, lg: false });

  const {
    setActiveUser,
    nextUserIndex,
    setNextUserIndex,
    activeUser,
    currentIndex,
  } = useStoryStore();
  const [isPaused, setIsPaused] = useState(false);
  const [activeStory, setActiveStory] = useState<StoryModel | null>(null);
  const [nextStoryIndex, setNextStoryIndex] = useState(0);

  const [progress, setProgress] = useState(0);
  const storyLength = activeUser?.storyModels?.length ?? 0;
  const [scheduledNextUserIndex, setScheduledNextUserIndex] = useState<
    number | null
  >(0);

  useEffect(() => {
    if (currentIndex) {
      setScheduledNextUserIndex(currentIndex);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (
      fetchAllStories &&
      scheduledNextUserIndex !== null &&
      scheduledNextUserIndex < fetchAllStories.length
    ) {
      setNextUserIndex(scheduledNextUserIndex);
      setActiveUser(fetchAllStories[scheduledNextUserIndex]);
      setActiveStory(fetchAllStories[scheduledNextUserIndex]?.storyModels[0]);
      setNextStoryIndex(0);
    }
  }, [scheduledNextUserIndex, fetchAllStories]);

  useEffect(() => {
    if (
      !activeUser?.storyModels ||
      activeUser.storyModels.length === 0 ||
      !fetchAllStories
    ) {
      return;
    }

    const timer = setInterval(() => {
      if (!isPaused) {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            const nextStory = nextStoryIndex + 1;

            if (nextStoryIndex < storyLength - 1) {
              setActiveStory(activeUser.storyModels[nextStory]);
              setNextStoryIndex(nextStory);
            } else {
              const nextUser = (nextUserIndex + 1) % fetchAllStories.length;

              if (nextUser < fetchAllStories.length) {
                setScheduledNextUserIndex(nextUser);
              }
            }

            return 0;
          }

          return prevProgress + 100 / 30;
        });
      }
    }, 100);

    return () => clearInterval(timer);
  }, [
    activeUser,
    nextStoryIndex,
    nextUserIndex,
    fetchAllStories,
    storyLength,
    isPaused,
  ]);

  const handleUserClick = (value: number) => {
    if (fetchAllStories) {
      if (nextStoryIndex !== 0) {
        setNextStoryIndex(0);
      }
      setScheduledNextUserIndex(value);
      setActiveUser(fetchAllStories[value]);
      setProgress(0);
      setIsPaused(false);
    }
  };

  const handleRightClick = () => {
    if (!activeUser?.storyModels || !fetchAllStories) {
      return;
    }

    const nextStory = nextStoryIndex + 1;

    if (nextStoryIndex < storyLength - 1) {
      setActiveStory(activeUser.storyModels[nextStory]);
      setNextStoryIndex(nextStory);
    } else {
      const nextUser = (nextUserIndex + 1) % fetchAllStories.length;

      if (nextUser < fetchAllStories.length) {
        setScheduledNextUserIndex(nextUser);
      }
    }
    setProgress(0);
    setIsPaused(false);
  };

  const handleLeftClick = () => {
    if (!activeUser?.storyModels || !fetchAllStories) {
      return;
    }

    const nextStory = nextStoryIndex - 1;

    if (nextStoryIndex > 0) {
      setActiveStory(activeUser.storyModels[nextStory]);
      setNextStoryIndex(nextStory);
    } else {
      if (scheduledNextUserIndex !== null && scheduledNextUserIndex > 0) {
        const nextUser = scheduledNextUserIndex - 1;
        setScheduledNextUserIndex(nextUser);
      }
    }
    setProgress(0);
    setIsPaused(false);
  };

  const handlePauseStoryClick = () => {
    if (fetchAllStories && scheduledNextUserIndex !== null && activeUser) {
      setIsPaused(!isPaused);
      setActiveStory(activeUser.storyModels[nextStoryIndex]);
    }
  };

  return (
    <>
      <Modal
        isOpen={true}
        onClose={handleNavigateClick}
        size="full"
        trapFocus={false}
      >
        <ModalOverlay />
        <ModalContent>
          <Grid
            templateColumns={{
              base: "1fr",
              md: "0.2fr 1fr 0.2fr",
              lg: "0.6fr 0.3fr 0.7fr 0.3fr",
              xl: "0.3fr 0.4fr 0.4fr 0.4fr",
            }}
            templateAreas={{
              base: `"section1"
            "section2"
            `,
              md: `"left section1 right"
                  "left section2 right"
            `,
              lg: `"section1 left section2 right"`,
              xl: `"section1 left section2 right"`,
            }}
          >
            <Card
              position="fixed"
              width="100%"
              borderRadius="none"
              zIndex="10"
              boxShadow="none"
            >
              <ModalCloseButton
                position="fixed"
                top="10px"
                left="5px"
                size="lg"
                borderRadius="full"
                bg="gray.800"
                color="white"
                _hover={{ bg: "gray.700" }}
              />
              <Box
                position="fixed"
                top="10px"
                left="50px"
                color="#1877F2"
                onClick={handleNavigateClick}
                cursor="pointer"
              >
                <FaFacebook size="40px" />
              </Box>
              {isSmallScreen && <Box mt="60px" />}
            </Card>
            <Show above="lg">
              <GridItem
                area="section1"
                bg={colorMode === "dark" ? "gray.700" : "white"}
                height={{ base: "auto", lg: "100vh" }}
              >
                <Flex
                  mt="60px"
                  flexDirection="column"
                  padding="10px"
                  overflowY="auto"
                  height="auto"
                  maxHeight="93%"
                  css={{
                    "&::-webkit-scrollbar": {
                      width: "8px",
                    },
                    "&::-webkit-scrollbar-track": {
                      background: "transparent",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      background: "gray",
                      borderRadius: "8px",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                      background: "#555",
                    },
                  }}
                >
                  <Text fontSize="x-large" fontWeight="bold" ml="10px">
                    Stories
                  </Text>
                  <Text mt="20px" fontWeight="semibold" mb="10px" ml="10px">
                    Your Story
                  </Text>
                  {isLoading ? (
                    <Skeleton height="70px" mt="10px" />
                  ) : (
                    <>
                      {fetchAllStories
                        ?.sort((a, _) => {
                          if (a.userId === userId) return -1;
                          return 0;
                        })
                        .filter((id) => id.userId === userId)
                        .map((story, index) => (
                          <StoryListCard
                            key={story.userId}
                            story={story}
                            storyByUser={storyByUser}
                            handleUserClick={() => handleUserClick(index)}
                          />
                        ))}
                    </>
                  )}
                  {!storyByUser && (
                    <Flex alignItems="center" ml="5px" mt="5px" mb="5px">
                      <IconButton
                        aria-label="story"
                        icon={<FiPlus size="25px" />}
                        color="#1877F2"
                        isRound
                        height="60px"
                        width="60px"
                        onClick={onOpen}
                      />
                      <Flex flexDirection="column" ml="10px">
                        <Text fontWeight="semibold">Create a story</Text>
                        <Text fontSize="xs" color="gray.500">
                          Share a photo or write something.
                        </Text>
                      </Flex>
                    </Flex>
                  )}
                  <Text mt="10px" fontWeight="semibold" mb="10px" ml="10px">
                    All stories
                  </Text>

                  {isLoading ? (
                    <>
                      {array.map((skeleton) => (
                        <Skeleton height="70px" mt="10px" key={skeleton} />
                      ))}
                    </>
                  ) : (
                    <>
                      {fetchAllStories
                        ?.sort((a, _) => {
                          if (a.userId === userId) return -1;
                          return 0;
                        })
                        .filter((id) => id.userId !== userId)
                        .map((story, index) => (
                          <StoryListCard
                            key={story.userId}
                            story={story}
                            handleUserClick={() =>
                              handleUserClick(storyByUser ? index + 1 : index)
                            }
                          />
                        ))}
                    </>
                  )}
                </Flex>
              </GridItem>
            </Show>
            <GridItem
              area="section2"
              height="100vh"
              display="flex"
              justifyContent="center"
              alignItems="center"
              bg="black"
              position="relative"
              userSelect="none"
              mt={{ base: "40px", lg: "0" }}
            >
              <StoriesCard
                activeStory={activeStory}
                setActiveStory={setActiveStory}
                setNextStoryIndex={setNextStoryIndex}
                progress={progress}
                setProgress={setProgress}
                handlePauseStoryClick={handlePauseStoryClick}
                isPaused={isPaused}
                setIsPaused={setIsPaused}
              />
            </GridItem>
            <Show above="md">
              <GridItem
                area="left"
                bg="black"
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
              >
                {(nextUserIndex > 0 || nextStoryIndex > 0) && (
                  <NextButton direction="left" nextClick={handleLeftClick} />
                )}
              </GridItem>
              <GridItem
                area="right"
                bg="black"
                display="flex"
                justifyContent="start"
                alignItems="center"
              >
                <NextButton direction="right" nextClick={handleRightClick} />
              </GridItem>
            </Show>
          </Grid>
        </ModalContent>
      </Modal>
    </>
  );
};

export default StoryPage;
