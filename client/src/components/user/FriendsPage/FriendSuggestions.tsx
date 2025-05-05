import {
  Box,
  Card,
  Divider,
  Flex,
  IconButton,
  Skeleton,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { IoMdArrowRoundBack } from "react-icons/io";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import useFetchAllFriendSuggestions from "../../../hooks/user/useFetchAllFriendSuggestions";
import { useFriendStore } from "../../../store/friend-store";
import { useUserStore } from "../../../store/user-store";
import FriendsList from "./FriendsList";

const FriendSuggestions = () => {
  const { userId } = useUserStore();

  const {
    data: fetchFriendSuggestions,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useFetchAllFriendSuggestions({
    userId: userId,
    pageSize: 20,
  });

  const fetchFriendSuggestionsData =
    fetchFriendSuggestions?.pages.reduce(
      (total, page) => total + page.userList.length,
      0
    ) || 0;

  const array = [1, 2, 3, 4, 5];

  const { setIsAllFriends, setIsSuggestions, setIsFriendsRequest } =
    useFriendStore();
  const navigate = useNavigate();
  const handleNavigateClick = () => {
    navigate("/friends");
    setIsAllFriends(false);
    setIsSuggestions(false);
    setIsFriendsRequest(false);
  };

  return (
    <Card
      borderRadius="none"
      height={{ base: "100vh", lg: "99vh", xl: "93vh" }}
    >
      <Box
        padding={3}
        position="sticky"
        top="60px"
        mt={{ base: "50px", xl: "0" }}
        height="100%"
        overflowY="auto"
        id="scrollable-suggestions"
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
        <Flex alignItems="center">
          <IconButton
            icon={<IoMdArrowRoundBack size="25px" />}
            aria-label="Back"
            variant="ghost"
            size="md"
            isRound
            mr="10px"
            mb="15px"
            onClick={handleNavigateClick}
          />

          <Box>
            <Text
              _hover={{ textDecoration: "underline" }}
              fontSize="sm"
              cursor="pointer"
              onClick={handleNavigateClick}
            >
              Friends
            </Text>

            <Text fontSize="2xl" fontWeight="bold" mb="10px">
              Suggestions
            </Text>
          </Box>
        </Flex>
        <Divider mb="15px" />
        <Text fontSize="lg" fontWeight="semibold">
          People you may know
        </Text>

        <InfiniteScroll
          dataLength={fetchFriendSuggestionsData}
          next={fetchNextPage}
          hasMore={!!hasNextPage}
          loader={<Spinner />}
          scrollableTarget="scrollable-suggestions"
        >
          {isLoading ? (
            <>
              {array.map((skeleton) => (
                <Skeleton height="100px" key={skeleton} mt="10px" />
              ))}
            </>
          ) : (
            <>
              {fetchFriendSuggestions &&
                fetchFriendSuggestions.pages.map((page) =>
                  page.userList.map((list) => (
                    <FriendsList key={list.uniqueId} friend={list} />
                  ))
                )}
            </>
          )}
        </InfiniteScroll>
      </Box>
    </Card>
  );
};

export default FriendSuggestions;
