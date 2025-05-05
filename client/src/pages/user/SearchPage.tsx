import {
  Box,
  Card,
  Grid,
  GridItem,
  Skeleton,
  Spinner,
  Text,
} from "@chakra-ui/react";
import SearchList from "../../components/user/SearchPage/SearchList";
import useSearchUser from "../../hooks/user/useSearchUser";
import { useSearchParams } from "react-router-dom";
import { UserDataModelList } from "../../entities/User";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("keyword") || "";

  const {
    data: searchUser,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useSearchUser({ keyword: query, pageSize: 15 });

  const [searchResults, setSearchResults] = useState<UserDataModelList[]>([]);
  const searchList = searchUser?.pages.flatMap((page) => page.userList) || [];

  useEffect(() => {
    if (searchUser) {
      setSearchResults(searchList);
    }
  }, [searchUser]);

  const searchUserData =
    searchUser?.pages.reduce(
      (total, page) => total + page.userList.length,
      0
    ) || 0;

  const array = [1, 2, 3, 4, 5];

  return (
    <Grid
      templateColumns={{
        base: "1fr",
        md: "0.1fr 0.8fr 0.1fr",
        lg: "0.2fr 0.6fr 0.2fr",
        xl: "0.5fr 0.5fr 0.5fr",
      }}
      templateAreas={{
        base: `"section"`,
        md: `" asideLeft section asideRight"`,
        lg: `" asideLeft section asideRight"`,
        xl: `"asideLeft section asideRight"`,
      }}
      mt={{ base: "55px", md: "35px", lg: "55px", xl: "5px" }}
      padding={{ base: 2, md: 7, lg: 2 }}
      as="main"
    >
      <GridItem area="section" as="section">
        {searchResults?.length === 0 ? (
          <Box display="flex" justifyContent="center" mt="100px">
            <Text fontSize="40px" fontWeight="semibold">
              Oops! We couldn't find anyone matching your search.
            </Text>
          </Box>
        ) : (
          <Card padding={2}>
            <Text fontSize="xl" fontWeight="bold" ml="10px">
              People
            </Text>
            <InfiniteScroll
              dataLength={searchUserData}
              next={fetchNextPage}
              hasMore={!!hasNextPage}
              loader={<Spinner />}
            >
              {isLoading ? (
                <>
                  {array.map((skeleton) => (
                    <Skeleton height="100px" mt="10px" key={skeleton} />
                  ))}
                </>
              ) : (
                <>
                  {searchResults.map((user) => (
                    <SearchList key={user.uniqueId} user={user} />
                  ))}
                </>
              )}
            </InfiniteScroll>
          </Card>
        )}
      </GridItem>
    </Grid>
  );
};

export default SearchPage;
