import { Skeleton, SkeletonText, useColorMode } from "@chakra-ui/react";

const ProfilePageHeaderSkeleton = () => {
  const { colorMode } = useColorMode();
  return (
    <Skeleton
      width="100%"
      height={{ base: "250px", md: "330px", lg: "400px", xl: "450px" }}
      bg={colorMode === "dark" ? "#181818" : "gray.100"}
      borderBottomLeftRadius="10px"
      borderBottomRightRadius="10px"
    >
      <SkeletonText />
    </Skeleton>
  );
};

export default ProfilePageHeaderSkeleton;
