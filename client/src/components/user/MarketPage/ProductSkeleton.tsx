import { Box, Skeleton, SkeletonText } from "@chakra-ui/react";

const ProductSkeleton = () => {
  return (
    <Box>
      <Skeleton boxSize="250px" borderRadius="8px" mt="20px" width="100%" />
      <SkeletonText mt="5px" />
    </Box>
  );
};

export default ProductSkeleton;
