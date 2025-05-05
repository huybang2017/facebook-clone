import { Box, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../components/user/MarketPage/ProductCard";
import ProductSkeleton from "../../components/user/MarketPage/ProductSkeleton";
import { ProductModel } from "../../entities/Product";
import useSearchProduct from "../../hooks/user/useSearchProduct";

const SearchMarketPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("keyword") || "";

  const {
    data: searchProduct,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useSearchProduct({ keyword: query, pageSize: 20 });

  const [searchResults, setSearchResults] = useState<ProductModel[]>([]);
  const searchList =
    searchProduct?.pages.flatMap((page) => page.productModels) || [];

  useEffect(() => {
    if (searchProduct) {
      setSearchResults(searchList);
    }
  }, [searchProduct]);

  const searchProductData =
    searchProduct?.pages.reduce(
      (total, page) => total + page.productModels.length,
      0
    ) || 0;

  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <>
      {searchResults?.length === 0 ? (
        <Box display="flex" justifyContent="center" mt="100px">
          <Text fontSize="40px" fontWeight="semibold">
            Oops! We couldn't find the item matching your search.
          </Text>
        </Box>
      ) : (
        <>
          <InfiniteScroll
            dataLength={searchProductData}
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
                  {searchResults.map((item) => (
                    <ProductCard key={item.productId} product={item} />
                  ))}
                </>
              )}
            </SimpleGrid>
          </InfiniteScroll>
        </>
      )}
    </>
  );
};

export default SearchMarketPage;
