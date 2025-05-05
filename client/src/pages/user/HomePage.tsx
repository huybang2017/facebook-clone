import {
  Box,
  Flex,
  Grid,
  GridItem,
  Show,
  Skeleton,
  Spinner,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import NextButton from "../../components/user/Buttons/NextButton";
import Contacts from "../../components/user/HomePage/Contacts";
import CreateStoryCard from "../../components/user/HomePage/CreateStoryCard";
import Sidebar from "../../components/user/HomePage/Sidebar";
import StoryCard from "../../components/user/HomePage/StoryCard";
import CreatePost from "../../components/user/Post/CreatePost";
import Posts from "../../components/user/Post/Posts";
import NoAvailablePost from "../../components/user/ProfilePage/NoAvailablePost";
import useFetchAllPosts from "../../hooks/user/useFetchAllPosts";
import useFetchAllStories from "../../hooks/user/useFetchAllStories";
import { useStoryStore } from "../../store/story-store";
import { useUserStore } from "../../store/user-store";

const HomePage = () => {
  const { data, fetchNextPage, hasNextPage, isLoading } = useFetchAllPosts({
    pageSize: 5,
  });
  const postLength = data?.pages.flatMap((list) => list.postList).length || 0;
  const fetchedPostData =
    data?.pages.reduce((total, page) => total + page.postList.length, 0) || 0;
  const array = [1, 2, 3];
  const storiesArray = [1, 2, 3, 4, 5, 6];
  const { firstName, userId } = useUserStore();
  const [name, setName] = useState<string>("");
  const { data: fetchAllStories, isLoading: isStoriesLoading } =
    useFetchAllStories();

  useEffect(() => {
    if (firstName) {
      setName(firstName);
    }
  }, [firstName]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const storiesLength = fetchAllStories?.length ?? 0;

  const storiesBreakpoint = useBreakpointValue({
    base: 2,
    md: 5,
    lg: 4,
    xl: 5,
  });

  const showButtons = storiesLength >= (storiesBreakpoint ?? 0);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const navigate = useNavigate();
  const { setCurrentIndex } = useStoryStore();
  const handleNavigateClick = (index: number) => {
    navigate(`/stories`);
    setCurrentIndex(index);
  };

  return (
    <>
      <Grid
        templateColumns={{
          base: "1fr",
          lg: "0.6fr 0.4fr",
          xl: "0.2fr 0.2fr 0.5fr 0.2fr 0.2fr",
        }}
        templateAreas={{
          base: `"section"`,
          lg: `"section asideRight"`,
          xl: `"asideLeft left section right asideRight"`,
        }}
        mt={{ base: "50px", md: "35px", lg: "55px", xl: "5px" }}
        padding={{ base: 2, md: 7, lg: 2 }}
        as="main"
      >
        <GridItem
          area="section"
          as="section"
          overflow="hidden"
          position="relative"
        >
          {isLoading ? (
            <Skeleton height="100px" />
          ) : (
            <CreatePost firstName={name || null} />
          )}
          {showButtons && (
            <>
              <Box position="absolute" top="210px" left="5px" zIndex={5}>
                <NextButton
                  direction="left"
                  nextClick={() => handleScroll("left")}
                />
              </Box>
              <Box position="absolute" top="210px" right="5px" zIndex={5}>
                <NextButton
                  direction="right"
                  nextClick={() => handleScroll("right")}
                />
              </Box>
            </>
          )}
          <Flex
            ref={scrollRef}
            overflowX="auto"
            sx={{
              "&::-webkit-scrollbar": {
                display: "none",
              },
              scrollbarWidth: "none",
            }}
          >
            {isStoriesLoading ? (
              <>
                {storiesArray.map((skeleton) => (
                  <Skeleton
                    height="200px"
                    minWidth="120px"
                    maxWidth="120px"
                    mt="10px"
                    mr="10px"
                    borderRadius="5px"
                    key={skeleton}
                  />
                ))}
              </>
            ) : (
              <>
                <CreateStoryCard />
                {fetchAllStories
                  ?.sort((a, _) => {
                    if (a.userId === userId) return -1;
                    return 0;
                  })
                  .map((story, index) => {
                    return (
                      <StoryCard
                        key={story.userId}
                        story={story}
                        handleNavigateClick={() => handleNavigateClick(index)}
                      />
                    );
                  })}
              </>
            )}
          </Flex>

          <InfiniteScroll
            dataLength={fetchedPostData}
            next={fetchNextPage}
            hasMore={!!hasNextPage}
            loader={<Spinner />}
          >
            {isLoading ? (
              <>
                {array.map((skeleton) => (
                  <Skeleton height="300px" mt="10px" key={skeleton} />
                ))}
              </>
            ) : postLength < 1 ? (
              <NoAvailablePost />
            ) : (
              <>
                {data?.pages.map((page) =>
                  page.postList.map((posts) => (
                    <Posts key={posts.postId} posts={posts} />
                  ))
                )}
              </>
            )}
          </InfiniteScroll>
        </GridItem>
        <Show above="xl">
          <GridItem area="asideLeft" as="aside" position="fixed" zIndex={5}>
            <Sidebar />
          </GridItem>
        </Show>

        <Show above="lg">
          <Box
            position="relative"
            _hover={{
              "& .scrollable": {
                "&::-webkit-scrollbar-thumb": {
                  background: "#888",
                },
              },
            }}
          >
            <GridItem
              className="scrollable"
              area="asideRight"
              as="aside"
              position="fixed"
              right="5px"
              height="91vh"
              overflowY="auto"
              css={{
                "&::-webkit-scrollbar": {
                  width: "8px",
                },
                "&::-webkit-scrollbar-track": {
                  background: "transparent",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "transparent",
                  borderRadius: "8px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "#555",
                },
              }}
            >
              <Contacts />
            </GridItem>
          </Box>
        </Show>
      </Grid>
    </>
  );
};

export default HomePage;
