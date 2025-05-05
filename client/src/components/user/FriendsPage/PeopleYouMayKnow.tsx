import {
  Box,
  Button,
  Divider,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { FaCaretDown } from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import useFetchAllFriendRequest from "../../../hooks/user/useFetchAllFriendRequest";
import useFetchAllFriendSuggestions from "../../../hooks/user/useFetchAllFriendSuggestions";
import { useFriendStore } from "../../../store/friend-store";
import { useUserStore } from "../../../store/user-store";
import FriendRequestCard from "./FriendRequestCard";

const PeopleYouMayKnow = () => {
  const { userId } = useUserStore();
  const { setIsAllFriends, setIsSuggestions, setIsFriendsRequest } =
    useFriendStore();
  const navigate = useNavigate();

  const {
    data: fetchAllRequest,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useFetchAllFriendRequest({
    userId: userId,
    pageSize: 14,
  });

  const requestList =
    fetchAllRequest?.pages.flatMap((page) => page.userList) || [];
  const requestListSize = requestList.length > 14;
  const requestSize = requestList.length >= 1;

  const {
    data: fetchFriendSuggestions,
    fetchNextPage: fetchNextPageSuggestions,
    hasNextPage: hasNextPageSuggestions,
    isLoading: isLoadingSuggestions,
  } = useFetchAllFriendSuggestions({
    userId: userId,
    pageSize: 20,
  });

  const fetchFriendSuggestionsData =
    fetchFriendSuggestions?.pages.reduce(
      (total, page) => total + page.userList.length,
      0
    ) || 0;

  const handleNavigateSuggestionsClick = () => {
    navigate("/friends/suggestions");
    setIsSuggestions(true);
    setIsFriendsRequest(false);
    setIsAllFriends(false);
  };

  const handleNavigateFriendRequestClick = () => {
    navigate("/friends/requests");
    setIsFriendsRequest(true);
    setIsSuggestions(false);
    setIsAllFriends(false);
  };

  return (
    <Box padding={{ base: 2, md: 5, lg: 7 }}>
      {requestSize && (
        <>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={{ base: "10px", md: "20px" }}
          >
            <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold">
              Friend Requests
            </Text>

            <Text
              fontSize={{ base: "md", md: "lg" }}
              color="blue.500"
              cursor="pointer"
              onClick={handleNavigateFriendRequestClick}
            >
              See all
            </Text>
          </Box>
          <SimpleGrid columns={{ base: 1, md: 4, lg: 5, xl: 7 }} spacing={2}>
            {fetchAllRequest?.pages.map((page) =>
              page.userList.map((request) => (
                <FriendRequestCard
                  key={request.uniqueId}
                  request={request}
                  isFriendRequest={true}
                />
              ))
            )}
          </SimpleGrid>
          {requestListSize && (
            <Button
              width="100%"
              mt="10px"
              color="blue.500"
              onClick={() => fetchNextPage()}
              isDisabled={!hasNextPage || isFetchingNextPage}
              isLoading={isFetchingNextPage}
            >
              <Text mr="10px">See More</Text> <FaCaretDown />
            </Button>
          )}

          <Divider mt="20px" mb="10px" />
        </>
      )}
      {isLoadingSuggestions ? (
        <Box display="flex" justifyContent="center" mt="30px">
          <Spinner />
        </Box>
      ) : (
        <>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={{ base: "10px", md: "20px" }}
          >
            <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold">
              People you may know
            </Text>

            <Text
              fontSize={{ base: "md", md: "lg" }}
              color="blue.500"
              cursor="pointer"
              onClick={handleNavigateSuggestionsClick}
            >
              See all
            </Text>
          </Box>
          <InfiniteScroll
            dataLength={fetchFriendSuggestionsData}
            next={fetchNextPageSuggestions}
            hasMore={!!hasNextPageSuggestions}
            loader={<Spinner />}
            scrollableTarget="scrollable-box"
          >
            <SimpleGrid columns={{ base: 1, md: 4, lg: 5, xl: 7 }} spacing={2}>
              {fetchFriendSuggestions?.pages.map((page) =>
                page.userList.map((request) => (
                  <FriendRequestCard
                    key={request.uniqueId}
                    request={request}
                    isFriendRequest={false}
                  />
                ))
              )}
            </SimpleGrid>
          </InfiniteScroll>
        </>
      )}
    </Box>
  );
};

export default PeopleYouMayKnow;
