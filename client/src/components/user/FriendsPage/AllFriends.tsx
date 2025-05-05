import {
  Box,
  Card,
  Divider,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Skeleton,
  SkeletonText,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import { IoMdArrowRoundBack } from "react-icons/io";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import useFetchAllUserFriends from "../../../hooks/user/useFetchAllUserFriends";
import useGetUserFriendListCount from "../../../hooks/user/useGetUserFriendListCount";
import { useFriendStore } from "../../../store/friend-store";
import { useUserStore } from "../../../store/user-store";
import FriendsList from "./FriendsList";
const AllFriends = () => {
  const { userId } = useUserStore();
  const { data: getFriendListCount, isLoading: countIsLoading } =
    useGetUserFriendListCount(userId ?? 0);

  const {
    data: fetchAllFriends,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useFetchAllUserFriends({
    userId: userId,
    pageSize: 10,
  });

  const fetchFriendsData =
    fetchAllFriends?.pages.reduce(
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
        id="scrollable-all"
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
              All Friends
            </Text>
          </Box>
        </Flex>
        <InputGroup justifyContent={{ base: "center", md: "flex-start" }}>
          <Input
            borderRadius={20}
            placeholder="Search friends"
            variant="filled"
            textAlign={{ base: "center", md: "left" }}
            fontSize={["sm", "md", "lg"]}
            width="100%"
          />
          <InputLeftElement>
            <IconButton
              aria-label="Search"
              icon={<BsSearch />}
              type="submit"
              bg="transparent"
              _hover={{ bg: "transparent" }}
            />
          </InputLeftElement>
        </InputGroup>
        <Divider mb="15px" mt="15px" />
        {countIsLoading ? (
          <SkeletonText />
        ) : (
          <Text fontSize="lg" fontWeight="semibold">
            {getFriendListCount?.count} friends
          </Text>
        )}

        <InfiniteScroll
          dataLength={fetchFriendsData}
          next={fetchNextPage}
          hasMore={!!hasNextPage}
          loader={<Spinner />}
          scrollableTarget="scrollable-all"
        >
          {isLoading ? (
            <>
              {array.map((skeleton) => (
                <Skeleton height="100px" key={skeleton} mt="10px" />
              ))}
            </>
          ) : (
            <>
              {fetchAllFriends &&
                fetchAllFriends.pages.map((page) =>
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

export default AllFriends;
