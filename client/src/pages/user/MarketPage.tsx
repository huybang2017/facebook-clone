import { Grid, GridItem, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import MarketSidebar from "../../components/user/MarketPage/MarketSidebar";
import ProductCard from "../../components/user/MarketPage/ProductCard";
import ProductSkeleton from "../../components/user/MarketPage/ProductSkeleton";
import useFetchAllProducts from "../../hooks/user/useFetchAllProducts";
import { useUserStore } from "../../store/user-store";

const MarketPage = () => {
  const {
    data: fetchAllProducts,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useFetchAllProducts({ pageSize: 20 });
  const location = useLocation();
  const { firstName } = useUserStore();
  const fetchProductData =
    fetchAllProducts?.pages.reduce(
      (total, page) => total + page.productModels.length,
      0
    ) || 0;

  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <>
      <Grid
        templateColumns={{
          base: "1fr",
          lg: "0.3fr 0.7fr",
          xl: "0.2fr 0.8fr",
        }}
        templateAreas={{
          base: `"section1"
            "section2"
            `,
          lg: `"section1  section2 "`,
          xl: `"section1  section2 "`,
        }}
      >
        <GridItem area="section1" zIndex="5">
          <MarketSidebar />
        </GridItem>
        <GridItem area="section2" padding={6}>
          <Text fontSize="xl" fontWeight="bold" textTransform="capitalize">
            {location.pathname === "/marketplace" ||
            location.pathname.startsWith(`/marketplace/category`) ||
            location.pathname.startsWith(`/marketplace/search`)
              ? "Today's Picks"
              : `${firstName}'s Listed Items`}
          </Text>
          {location.pathname === "/marketplace" ? (
            <>
              <InfiniteScroll
                dataLength={fetchProductData}
                next={fetchNextPage}
                hasMore={!!hasNextPage}
                loader={<Spinner />}
              >
                <SimpleGrid
                  columns={{ base: 1, md: 4, lg: 5, xl: 6 }}
                  spacing={2}
                >
                  {isLoading ? (
                    <>
                      {array.map((skeleton) => (
                        <ProductSkeleton key={skeleton} />
                      ))}
                    </>
                  ) : (
                    <>
                      {fetchAllProducts?.pages.map((page) =>
                        page.productModels.map((item) => (
                          <ProductCard key={item.productId} product={item} />
                        ))
                      )}
                    </>
                  )}
                </SimpleGrid>
              </InfiniteScroll>
            </>
          ) : (
            <Outlet />
          )}
          <ScrollRestoration />
        </GridItem>
      </Grid>
    </>
  );
};

export default MarketPage;
