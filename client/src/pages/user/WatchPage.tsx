import { Grid, GridItem, Skeleton, Spinner, } from "@chakra-ui/react";
import useFetchAllPosts from "../../hooks/user/useFetchAllPosts";
import InfiniteScroll from "react-infinite-scroll-component";
import NoAvailablePost from "../../components/user/ProfilePage/NoAvailablePost";
import Posts from "../../components/user/Post/Posts";

const WatchPage = () => {
  const { data, fetchNextPage, hasNextPage, isLoading } = useFetchAllPosts({
    pageSize: 5,
  });
  const postLength = data?.pages.flatMap((list) => list.postList).length || 0;
  const fetchedPostData =
    data?.pages.reduce((total, page) => total + page.postList.length, 0) || 0;
  const array = [1, 2, 3];
  return (
    <Grid
      templateColumns={{
        base: "1fr",
        lg: "0.2fr 0.6fr 0.2fr",
        xl: "0.3fr 0.5fr 0.3fr",
      }}
      templateAreas={{
        base: `"section"`,
        lg: `"asideLeft section asideRight"`,
        xl: `"asideLeft section asideRight"`,
      }}
      mt={{ base: "50px", md: "35px", lg: "55px", xl: "15px" }}
      padding={{ base: 3, md: 7, lg: 2 }}
    >
      <GridItem area="section">
        <InfiniteScroll
          dataLength={fetchedPostData}
          next={fetchNextPage}
          hasMore={!!hasNextPage}
          loader
        >
          {isLoading ? (
            <>
              {array.map((skeleton) => (
                <Skeleton height="300px" mt="10px" key={skeleton} />
              ))}
            </>
          ) : (
            <>
              {data && data.pages ? (
                (() => {
                  // Lọc các bài viết chỉ có duy nhất 1 video
                  const filteredPosts = data.pages
                    .flatMap((page) => page.postList)
                    .filter((post) => {
                      const images = post.postImages || [];
                      return (
                        images.length === 1 &&
                        images[0].postImageUrl?.match(/\.(mp4|webm|ogg|mov|mkv)$/i)
                      );
                    });

                  if (filteredPosts.length === 0) {
                    return <NoAvailablePost />;
                  }

                  return filteredPosts.map((post) => (
                    <Posts key={post.postId} posts={post} />
                  ));
                })()
              ) : (
                <NoAvailablePost />
              )}
            </>
          )}
        </InfiniteScroll>
      </GridItem>
    </Grid>
  );
};

export default WatchPage;
