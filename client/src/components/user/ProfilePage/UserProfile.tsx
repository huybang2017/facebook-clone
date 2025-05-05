import {
  Box,
  Card,
  Grid,
  GridItem,
  Image,
  Show,
  SimpleGrid,
  Skeleton,
  Spacer,
  Spinner,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

import InfiniteScroll from "react-infinite-scroll-component";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import pic from "../../../assets/profpic.jpeg";
import useFetchAllPhotos from "../../../hooks/user/useFetchAllPhotos";
import useFetchAllUserFriends from "../../../hooks/user/useFetchAllUserFriends";
import useFetchAllUserPosts from "../../../hooks/user/useFetchAllUserPosts";
import useGetUserProfileInfo from "../../../hooks/user/useGetUserProfileInfo";
import ErrorPage from "../../../pages/user/ErrorPage";
import { useProfileStore } from "../../../store/profile-store";
import CreatePost from "../Post/CreatePost";
import Posts from "../Post/Posts";
import ImageCard from "./ImageCard";
import NoAvailableFriends from "./NoAvailableFriends";
import NoAvailablePhotos from "./NoAvailablePhotos";
import NoAvailablePost from "./NoAvailablePost";
import ProfilePageHeader from "./ProfilePageHeader";
const UserProfile = () => {
  const params = useParams<{ userId: string }>();
  const userId = Number(params.userId);
  const { data: getUserProfile, isLoading: isUserInfoLoading } =
    useGetUserProfileInfo(userId);
  if (
    typeof userId !== "number" ||
    isNaN(userId) ||
    typeof userId === "string"
  ) {
    return <ErrorPage />;
  }
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading: isPostLoading,
  } = useFetchAllUserPosts({
    userId: userId,
    pageSize: 5,
  });
  const postLength = data?.pages.flatMap((list) => list.postList).length || 0;
  const fetchedPostData =
    data?.pages.reduce((total, page) => total + page.postList.length, 0) || 0;
  const location = useLocation();

  const isSmallScreen = useBreakpointValue({ base: true, md: false });
  const sliceLength = isSmallScreen ? 4 : 9;

  const { data: fetchAllPhotos, isLoading: isPhotosLoading } =
    useFetchAllPhotos({
      userId: userId,
      pageSize: 9,
    });
  const { isProfile } = useProfileStore();
  const photosLength =
    fetchAllPhotos?.pages.flatMap((list) => list.postImageModels).length || 0;

  const { data: fetchAllFriends, isLoading: isFriendsLoading } =
    useFetchAllUserFriends({
      userId: userId,
      pageSize: 9,
    });
  const friendsLength =
    fetchAllFriends?.pages.flatMap((list) => list.userList).length || 0;

  const { setIsProfile } = useProfileStore();
  const navigate = useNavigate();
  const handleNavigateProfileClick = (userId: number) => {
    navigate(`/profile/${userId}`);
    setIsProfile(true);
  };

  return (
    <>
      <ProfilePageHeader
        isLoading={isUserInfoLoading}
        coverPhoto={getUserProfile?.coverPhoto}
        profilePicture={getUserProfile?.profilePicture}
        firstName={getUserProfile?.firstName}
        lastName={getUserProfile?.lastName}
      />
      {location.pathname === `/profile/${userId}` ? (
        <>
          <Grid
            templateColumns={{
              base: "1fr",
              md: "0.2fr 1fr 0.2fr",
              lg: "0.4fr 0.6fr",
              xl: isProfile
                ? "0.3fr 0.4fr 0.6fr 0.3fr"
                : "0.2fr 0.4fr 0.6fr 0.2fr",
            }}
            templateAreas={{
              base: `
              "section1"
              "section2"
              `,
              md: `
              " asideLeft section1 asideRight"
              " asideLeft section2 asideRight"
              `,
              lg: `
             " section1 section2 "
              `,
              xl: `
            "asideLeft section1 section2 asideRight"
            `,
            }}
            padding={3}
          >
            <Show above="xl">
              <GridItem area="asideLeft" />
            </Show>
            <Show above="xl">
              <GridItem area="asideRight" />
            </Show>
            <GridItem
              area="section1"
              mr={{ base: "0px", lg: "10px", xl: "5px" }}
              mb={{ base: "10px", lg: "0px" }}
              as="section"
            >
              {/* <Box position="sticky" top="-100px"> */}
              {isPhotosLoading ? (
                <Skeleton height="300px" mb="10px" />
              ) : (
                <Card
                  padding={{ base: 2, xl: 4 }}
                  mr={{ base: "0px", xl: "5px" }}
                >
                  <Box display="flex" alignItems="center" mb="10px">
                    <Text fontSize="xl" fontWeight="semibold">
                      Photos
                    </Text>
                    <Spacer />
                    <Link to={`/profile/${userId}/photos`}>
                      <Text fontSize="lg" color="#1877F2" cursor="pointer">
                        See all photos
                      </Text>
                    </Link>
                  </Box>
                  {photosLength < 1 ? (
                    <NoAvailablePhotos />
                  ) : (
                    <SimpleGrid columns={{ base: 2, md: 3 }} spacing={1}>
                      {fetchAllPhotos &&
                        fetchAllPhotos.pages.map((page, pageIndex) =>
                          pageIndex === 0
                            ? page.postImageModels
                                .slice(0, sliceLength)
                                .map((image) => (
                                  <Box
                                    key={image.postImageId}
                                    _hover={{ filter: "brightness(1.1)" }}
                                  >
                                    <ImageCard
                                      images={image}
                                      imageList={page.postImageModels}
                                    />
                                  </Box>
                                ))
                            : null
                        )}
                    </SimpleGrid>
                  )}
                </Card>
              )}

              {isFriendsLoading ? (
                <Skeleton height="300px" />
              ) : (
                <Card
                  padding={{ base: 2, xl: 4 }}
                  mr={{ base: "0px", xl: "5px" }}
                  mt="10px"
                >
                  <Box display="flex" alignItems="center" mb="10px">
                    <Text fontSize="xl" fontWeight="semibold">
                      Friends
                    </Text>
                    <Spacer />
                    {friendsLength < 1 ? (
                      <Link to={`/friends/suggestions`}>
                        <Text fontSize="lg" color="#1877F2" cursor="pointer">
                          Find friends
                        </Text>
                      </Link>
                    ) : (
                      <Link to={`/profile/${userId}/friends`}>
                        <Text fontSize="lg" color="#1877F2" cursor="pointer">
                          See all friends
                        </Text>
                      </Link>
                    )}
                  </Box>
                  {friendsLength < 1 ? (
                    <NoAvailableFriends />
                  ) : (
                    <SimpleGrid columns={{ base: 2, md: 3 }} spacing={1}>
                      {fetchAllFriends &&
                        fetchAllFriends.pages.map((page, pageIndex) =>
                          pageIndex === 0
                            ? page.userList
                                .slice(0, sliceLength)
                                .map((list) => (
                                  <Box
                                    key={list.uniqueId}
                                    _hover={{ filter: "brightness(1.1)" }}
                                  >
                                    <Image
                                      src={list.profilePicture || pic}
                                      height="130px"
                                      width="100%"
                                      borderRadius="10px"
                                      cursor="pointer"
                                      onClick={() =>
                                        handleNavigateProfileClick(list.userId)
                                      }
                                    />
                                    <Text
                                      textTransform="capitalize"
                                      mb="10px"
                                      fontWeight="semibold"
                                      onClick={() =>
                                        handleNavigateProfileClick(list.userId)
                                      }
                                      cursor="pointer"
                                      userSelect="none"
                                      isTruncated={true}
                                      fontSize="sm"
                                      _hover={{ textDecor: "underline" }}
                                    >
                                      {list.firstName} {list.lastName}
                                    </Text>
                                  </Box>
                                ))
                            : null
                        )}
                    </SimpleGrid>
                  )}
                </Card>
              )}
              {/* </Box> */}
            </GridItem>
            <GridItem area="section2" as="section">
              {isUserInfoLoading ? (
                <Skeleton height="100px" />
              ) : (
                <CreatePost firstName={getUserProfile?.firstName || null} />
              )}

              <InfiniteScroll
                dataLength={fetchedPostData}
                next={fetchNextPage}
                hasMore={!!hasNextPage}
                loader={<Spinner />}
              >
                {isPostLoading ? (
                  <Skeleton height="300px" mt="10px" />
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
          </Grid>
        </>
      ) : (
        <Grid
          templateColumns={{
            base: "1fr",
            lg: "0.1fr 1fr 0.1fr",
            xl: isProfile ? "0.3fr 1fr 0.3fr" : "0.2fr 1fr 0.2fr",
          }}
          templateAreas={{ base: "'main'", lg: "'asideLeft main asideRight'" }}
          padding={3}
        >
          <GridItem area="main">
            <Outlet />
          </GridItem>
          <Show above="lg">
            <GridItem area="asideLeft" />
          </Show>
          <Show above="lg">
            <GridItem area="asideRight" />
          </Show>
        </Grid>
      )}
    </>
  );
};

export default UserProfile;
