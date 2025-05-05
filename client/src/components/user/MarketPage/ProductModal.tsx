import {
  Avatar,
  Box,
  Card,
  Divider,
  Flex,
  Grid,
  GridItem,
  Image,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Show,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaFacebook, FaFacebookMessenger } from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import pic from "../../../assets/profpic.jpeg";
import usesGetProductById from "../../../hooks/user/usesGetProductById";
import ErrorPage from "../../../pages/user/ErrorPage";
import { useUserStore } from "../../../store/user-store";
import { formatCurrency } from "../../../utilities/formatCurrency";
import MessageButton from "../Buttons/MessageButton";
import NextButton from "../Buttons/NextButton";
import PostUserProfileCard from "../Post/PostUserProfileCard";
const ProductModal = () => {
  const params = useParams<{ productId: string }>();
  const productId = Number(params.productId);

  if (
    typeof productId !== "number" ||
    isNaN(productId) ||
    typeof productId === "string"
  ) {
    return <ErrorPage />;
  }

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const isSmallScreen = useBreakpointValue({ base: true, lg: false });
  const isLargeScreen = useBreakpointValue({ base: false, lg: true });
  const navigate = useNavigate();

  const { userId } = useUserStore();
  const { data: getProductById } = usesGetProductById(productId!);

  const time = new Date(getProductById?.timestamp ?? new Date().toISOString());
  const handleNavigateClick = () => {
    navigate(-1);
  };

  const handleNextLeftImageClick = () => {
    if (getProductById && getProductById?.productImages.length > 1) {
      const nextIndex =
        (currentIndex - 1 + getProductById?.productImages.length) %
        getProductById?.productImages.length;
      setCurrentIndex(nextIndex);
    }
  };
  const handleNextRightImageClick = () => {
    if (getProductById && getProductById?.productImages.length > 1) {
      const nextIndex =
        (currentIndex + 1) % getProductById?.productImages.length;
      setCurrentIndex(nextIndex);
    }
  };

  const handleSelectImageClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleNavigateProfileClick = () => {
    navigate(`/profile/${getProductById?.user.userId}`);
  };

  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <>
      <Modal
        isOpen={true}
        onClose={handleNavigateClick}
        size="full"
        trapFocus={false}
      >
        <ModalOverlay />
        <ModalContent>
          <Card position="fixed" width="100%" borderRadius="none" zIndex="10">
            <ModalCloseButton
              position="fixed"
              left="5px"
              size="lg"
              borderRadius="full"
              bg="gray.800"
              color="white"
              _hover={{ bg: "gray.700" }}
            />
            <Link to="/home">
              <Box position="fixed" top="2" left="50px" color="#1877F2">
                <FaFacebook size="40px" />
              </Box>
            </Link>
            {isSmallScreen && <Box mt="60px" />}
          </Card>

          <Grid
            templateColumns={{
              base: "1fr",
              lg: "60px 0.7fr 60px 0.5fr",
              xl: "60px 0.8fr 60px 0.3fr",
            }}
            templateAreas={{
              base: `"section1"
            "section2"
            `,
              lg: `"leftButton section1 rightButton section2"`,
              xl: `"leftButton section1 rightButton section2"`,
            }}
          >
            <GridItem
              area="section1"
              bg="black"
              height={{ base: "auto", lg: "100vh", xl: "100vh" }}
              display={isLargeScreen ? "flex" : "block"}
              justifyContent={isLargeScreen ? "center" : undefined}
              alignItems={isLargeScreen ? "center" : undefined}
            >
              {isSmallScreen && <Box padding={5} mt="60px" />}
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                position="relative"
              >
                {getProductById &&
                  getProductById?.productImages?.length > 1 &&
                  isSmallScreen && (
                    <Box
                      position={{ base: "absolute", lg: "static" }}
                      left={{ base: "5px", lg: undefined }}
                      ml={{ base: "5px", lg: "0" }}
                      top={{ base: "75px", md: "180px", lg: undefined }}
                    >
                      <NextButton
                        direction="left"
                        nextClick={handleNextLeftImageClick}
                      />
                    </Box>
                  )}

                <Flex
                  ml="5px"
                  mr="5px"
                  flexDirection="column"
                  alignItems="center"
                >
                  <Image
                    src={
                      getProductById?.productImages[currentIndex].productImage
                    }
                    overflow="hidden"
                    width="100%"
                    height={{
                      base: "200px",
                      md: "400px",
                      lg: "90vh",
                      xl: "90vh",
                    }}
                    mb={{ base: "20px", md: "30px" }}
                  />
                  <Flex flexWrap="wrap" justifyContent="center">
                    {getProductById?.productImages?.map((image, index) => (
                      <Image
                        src={image.productImage}
                        key={index}
                        height="40px"
                        width="40px"
                        mr="5px"
                        mt={{ base: "10px", md: "0" }}
                        borderRadius="5px"
                        onClick={() => handleSelectImageClick(index)}
                        cursor="pointer"
                        filter={
                          currentIndex === index ? "opacity(1)" : "opacity(0.3)"
                        }
                      />
                    ))}
                  </Flex>
                </Flex>

                {getProductById &&
                  getProductById?.productImages?.length > 1 &&
                  isSmallScreen && (
                    <Box
                      position={{ base: "absolute", lg: "static" }}
                      right={{ base: "5px", lg: undefined }}
                      mr={{ base: "5px", lg: "0" }}
                      top={{ base: "75px", md: "180px", lg: undefined }}
                    >
                      <NextButton
                        direction="right"
                        nextClick={handleNextRightImageClick}
                      />
                    </Box>
                  )}
              </Box>
              {isSmallScreen && <Box padding={5} />}
            </GridItem>
            <GridItem area="section2" height="100%">
              {isLargeScreen && (
                <>
                  <Card
                    position="fixed"
                    width="100%"
                    borderRadius="none"
                    zIndex="10"
                    height="60px"
                    boxShadow="none"
                    borderBottom="1px solid"
                    borderBottomColor="gray.500"
                  />
                </>
              )}
              <Box padding={4}>
                <Text
                  mt={{ base: "0", lg: "60px" }}
                  textTransform="capitalize"
                  fontSize="x-large"
                  fontWeight="bold"
                >
                  {getProductById?.productName}
                </Text>
                <Text fontWeight="semibold" fontSize="lg">
                  {formatCurrency(getProductById?.price ?? 0)}
                </Text>
                <Text
                  fontSize="xs"
                  color="gray.500"
                  fontWeight="semibold"
                  cursor="pointer"
                  mt="5px"
                >
                  Listed <ReactTimeAgo date={time} locale="en-US" />
                </Text>
                <Text fontSize="lg" fontWeight="semibold" mt="10px">
                  Details
                </Text>
                {getProductById?.productCondition && (
                  <Flex mt="10px" justifyContent="space-between">
                    <Text fontWeight="semibold">Condition</Text>
                    <Text>{getProductById?.productCondition}</Text>
                  </Flex>
                )}
                {getProductById?.brand && (
                  <Flex justifyContent="space-between" mt="5px">
                    <Text fontWeight="semibold">Brand</Text>
                    <Text textTransform="capitalize">
                      {getProductById?.brand}
                    </Text>
                  </Flex>
                )}
                {getProductById?.description && (
                  <Box mt="5px">
                    <Text fontWeight="semibold">Description</Text>
                    <Text>{getProductById?.description}</Text>
                  </Box>
                )}
                <Divider mt="20px" mb="20px" width="100%" />
                <Text fontSize="lg" fontWeight="semibold">
                  Seller Information
                </Text>
                <Flex
                  alignItems="center"
                  mt="10px"
                  cursor="pointer"
                  position="relative"
                >
                  <Avatar
                    src={getProductById?.user.profilePicture || pic}
                    size="md"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  />
                  <Text
                    textTransform="capitalize"
                    fontSize="lg"
                    fontWeight="semibold"
                    ml="10px"
                    onMouseEnter={() => setIsHovered(true)}
                  >
                    {getProductById?.user.firstName}{" "}
                    {getProductById?.user.lastName}
                  </Text>
                  {isHovered && (
                    <Box
                      position="absolute"
                      zIndex={100}
                      left={{ base: "0", md: "0", lg: "-100px", xl: "-50px" }}
                      top={{ base: "-110px", md: "-135px", lg: "-140px" }}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      <PostUserProfileCard
                        firstName={getProductById?.user.firstName ?? ""}
                        lastName={getProductById?.user.lastName ?? ""}
                        postUserId={getProductById?.user.userId ?? 0}
                        profilePicture={getProductById?.user.profilePicture}
                        handleNavigateClick={handleNavigateProfileClick}
                      />
                    </Box>
                  )}
                </Flex>

                {getProductById?.user.userId !== userId && (
                  <MessageButton
                    friendId={getProductById?.user.userId ?? 0}
                    mt="20px"
                    width="100%"
                  >
                    <FaFacebookMessenger size="20px" />
                    <Text ml="5px">Message</Text>
                  </MessageButton>
                )}
              </Box>
            </GridItem>
            <Show above="lg">
              <GridItem area="leftButton" bg="black">
                <Box position="absolute" top="50%" bottom="50%" ml="10px">
                  {getProductById &&
                    getProductById?.productImages?.length > 1 && (
                      <NextButton
                        direction="left"
                        nextClick={handleNextLeftImageClick}
                      />
                    )}
                </Box>
              </GridItem>
              <GridItem area="rightButton" bg="black">
                <Box position="absolute" top="50%" bottom="50%">
                  {getProductById &&
                    getProductById?.productImages?.length > 1 && (
                      <NextButton
                        direction="right"
                        nextClick={handleNextRightImageClick}
                      />
                    )}
                </Box>
              </GridItem>
            </Show>
          </Grid>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductModal;
