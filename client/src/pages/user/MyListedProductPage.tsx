import { Flex, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import { IoIosSend } from "react-icons/io";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductCard from "../../components/user/MarketPage/ProductCard";
import ProductSkeleton from "../../components/user/MarketPage/ProductSkeleton";
import useFetchAllUserListedProducts from "../../hooks/user/useFetchAllUserListedProducts";
import { useUserStore } from "../../store/user-store";

const MyListedProductPage = () => {
  const { userId } = useUserStore();

  const {
    data: fetchAllProducts,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useFetchAllUserListedProducts({ userId: userId ?? 0, pageSize: 20 });

  const fetchProductData =
    fetchAllProducts?.pages.reduce(
      (total, page) => total + page.productModels.length,
      0
    ) || 0;

  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const myListedItems =
    fetchAllProducts?.pages.flatMap((list) => list.productModels).length || 0;

  return (
    <>
      {myListedItems < 1 ? (
        <Flex
          justifyContent="center"
          alignItems="center"
          height="100%"
          flexDirection="column"
        >
          <IoIosSend size="100px" />
          <Text fontSize={{ base: "xl", lg: "xx-large" }} fontWeight="semibold">
            When you start selling, your listings will appear here.
          </Text>
        </Flex>
      ) : (
        <>
          <InfiniteScroll
            dataLength={fetchProductData}
            next={fetchNextPage}
            hasMore={!!hasNextPage}
            loader={<Spinner />}
          >
            <SimpleGrid columns={{ base: 1, md: 4, lg: 5, xl: 6 }} spacing={2}>
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
      )}
    </>
  );
};

export default MyListedProductPage;
