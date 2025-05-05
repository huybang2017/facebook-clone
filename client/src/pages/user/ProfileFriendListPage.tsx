import {
  Box,
  Button,
  Card,
  SimpleGrid,
  Skeleton,
  Spacer,
  Spinner,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import FriendListCard from "../../components/user/ProfilePage/FriendListCard";
import useFetchAllUserFriends from "../../hooks/user/useFetchAllUserFriends";
import InfiniteScroll from "react-infinite-scroll-component";
import ProfilePhotosPage from "./ProfilePhotosPage";
import NoAvailableFriends from "../../components/user/ProfilePage/NoAvailableFriends";

const ProfileFriendListPage = () => {
  const isSmallScreen = useBreakpointValue({ base: true, md: false });
  const params = useParams<{ userId: string }>();
  const userId = Number(params.userId);
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

  const friendsLength =
    fetchAllFriends?.pages.flatMap((list) => list.userList).length || 0;

  const array = [1, 2, 3, 4, 5];

  return (
    <>
      <Card padding={{ base: 2, md: 5 }}>
        <Box display="flex" alignItems="center" mb="10px">
          <Text fontSize="xl" fontWeight="semibold">
            Friends
          </Text>
          <Spacer />
          {!isSmallScreen && (
            <>
              <Link to="/friends/requests">
                <Button
                  fontSize="md"
                  color="blue.500"
                  cursor="pointer"
                  fontWeight="semibold"
                  mr="20px"
                  bg="none"
                >
                  Friend requests
                </Button>
              </Link>
              <Link to="/friends">
                <Button
                  fontSize="md"
                  color="blue.500"
                  cursor="pointer"
                  fontWeight="semibold"
                  bg="none"
                >
                  Find Friends
                </Button>
              </Link>
            </>
          )}
        </Box>
        {friendsLength < 1 ? (
          <NoAvailableFriends />
        ) : (
          <InfiniteScroll
            dataLength={fetchFriendsData}
            next={fetchNextPage}
            hasMore={!!hasNextPage}
            loader={<Spinner />}
          >
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={1}>
              {isLoading ? (
                <>
                  {array.map((skeleton) => (
                    <Skeleton height="100px" key={skeleton} />
                  ))}
                </>
              ) : (
                <>
                  {fetchAllFriends &&
                    fetchAllFriends.pages.map((page) =>
                      page.userList.map((list) => (
                        <FriendListCard key={list.uniqueId} friend={list} />
                      ))
                    )}
                </>
              )}
            </SimpleGrid>
          </InfiniteScroll>
        )}
      </Card>
      <Box mt="12px">
        <ProfilePhotosPage />
      </Box>
    </>
  );
};

export default ProfileFriendListPage;
