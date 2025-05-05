import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Flex,
  FormControl,
  Grid,
  GridItem,
  IconButton,
  Image,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Select,
  SimpleGrid,
  Text,
  Textarea,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FaFacebook } from "react-icons/fa6";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import pic from "../../../assets/profpic.jpeg";
import useSaveProduct from "../../../hooks/user/useSaveProduct";
import { useUserStore } from "../../../store/user-store";
import NextButton from "../Buttons/NextButton";

const CreateProductModal = () => {
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const { profilePicture, firstName, lastName } = useUserStore();
  const isSmallScreen = useBreakpointValue({ base: true, lg: false });
  const handleNavigateClick = () => {
    navigate("/home");
  };

  const handleNavigateMarketClick = () => {
    navigate("/marketplace");
  };

  const {
    loading,
    onSubmit,
    register,
    handleSubmit,
    imageFile,
    setImageFile,
    setValue,
    setImagePreview,
    imagePreview,
    productName,
    setProductName,
    productCondition,
    setProductCondition,
    brand,
    setBrand,
    description,
    setDescription,
    price,
    setPrice,
  } = useSaveProduct();

  const categories = [
    { name: "Vehicles", value: "VEHICLES" },
    { name: "Electronics", value: "ELECTRONICS" },
    { name: "Apparel", value: "APPAREL" },
    { name: "Toys & Games", value: "TOYS_AND_GAMES" },
    { name: "Home Sales", value: "HOME_SALES" },
    { name: "Entertainment", value: "ENTERTAINMENT" },
    { name: "Sports", value: "SPORTS" },
    { name: "Office Supplies", value: "OFFICE_SUPPLIES" },
    { name: "Musical  Instruments", value: "MUSICAL_INSTRUMENTS" },
  ];

  const condition = [
    { condition: "New", value: "NEW" },
    { condition: "Good", value: "GOOD" },
    { condition: "Fair", value: "FAIR" },
  ];
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleInputClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInput = (files: FileList | null) => {
    if (files && files.length > 0 && files.length <= 10) {
      setImageFile(files);
      setValue("file", files);
      const imageUrls = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreview(imageUrls);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFileInput(e.target.files);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFileInput(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (!imagePreview) return;
    return () => {
      imagePreview.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imagePreview]);

  const handleProductNameInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProductName(e.target.value);
  };

  const handlePriceInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };

  const handleBrandInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBrand(e.target.value);
  };

  const handleDescriptionInputChange = (
    e: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const handleConditionInputChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setProductCondition(e.target.value);
  };

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleRightNextClick = () => {
    if (imagePreview && currentIndex < imagePreview.length) {
      const nextIndex = (currentIndex + 1) % imagePreview.length;
      setCurrentIndex(nextIndex);
    }
  };

  const handleLeftNextClick = () => {
    if (imagePreview && currentIndex < imagePreview.length) {
      const nextIndex =
        (currentIndex - 1 + imagePreview.length) % imagePreview.length;
      setCurrentIndex(nextIndex);
    }
  };

  const handleSelectImageClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <>
      <Modal
        isOpen={true}
        onClose={handleNavigateMarketClick}
        size="full"
        preserveScrollBarGap={true}
        trapFocus={false}
      >
        <ModalOverlay />
        <ModalContent>
          {isSmallScreen && (
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

              <Box
                position="fixed"
                top="2"
                left="50px"
                color="#1877F2"
                onClick={handleNavigateClick}
              >
                <FaFacebook size="40px" />
              </Box>

              <Box mt="60px" />
            </Card>
          )}

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
              lg: `"section1 section2"`,
              xl: `"section1 section2"`,
            }}
          >
            <GridItem
              area="section1"
              bg={colorMode === "dark" ? "#262626" : "white"}
              height={{ base: "auto", lg: "100vh" }}
              position="relative"
              overflowY="auto"
              css={{
                "&::-webkit-scrollbar": {
                  width: "8px",
                },
                "&::-webkit-scrollbar-track": {
                  background: "transparent",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "gray",
                  borderRadius: "8px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "#555",
                },
              }}
            >
              {isSmallScreen && <Box mt="70px" />}
              {!isSmallScreen && (
                <Box mb="60px">
                  <ModalCloseButton
                    position="absolute"
                    left="5px"
                    size="lg"
                    borderRadius="full"
                    bg="gray.800"
                    color="white"
                    _hover={{ bg: "gray.700" }}
                  />

                  <Box
                    position="absolute"
                    top="2"
                    left="50px"
                    color="#1877F2"
                    onClick={handleNavigateClick}
                    cursor="pointer"
                  >
                    <FaFacebook size="40px" />
                  </Box>
                </Box>
              )}
              {!isSmallScreen && <Divider mb="5px" />}

              <Text fontSize="x-large" ml="10px" fontWeight="bold">
                Marketplace
              </Text>
              <Flex alignItems="center" mt="20px" cursor="pointer">
                <Avatar src={profilePicture || pic} size="md" ml="10px" />
                <Text
                  textTransform="capitalize"
                  fontSize="xl"
                  fontWeight="semibold"
                  ml="10px"
                >
                  {firstName} {lastName}
                </Text>
              </Flex>
              <Divider
                mt={{ base: "10px", lg: "20px" }}
                mb={{ base: "0px", lg: "10px" }}
              />
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  handleSubmit(onSubmit)(event);
                }}
              >
                <Box padding={3}>
                  <Text
                    fontSize="xs"
                    color="gray.500"
                    mb="5px"
                    fontWeight="semibold"
                  >
                    Photos {imageFile?.length || 0} / 10 - You can add up to 10
                    photos.
                  </Text>
                  <Flex
                    height={imagePreview ? "auto" : "180px"}
                    width="100%"
                    border={imagePreview ? undefined : "1px solid"}
                    justifyContent="center"
                    alignItems="center"
                    borderRadius="10px"
                    mb="10px"
                    onClick={handleInputClick}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    cursor="pointer"
                    borderColor={colorMode === "dark" ? "#383838" : "gray.200"}
                  >
                    <SimpleGrid columns={{ base: 2, md: 3 }} spacing={1}>
                      {imagePreview?.map((image, index) => (
                        <Image
                          key={index}
                          width="100%"
                          height="130px"
                          borderRadius="10px"
                          src={image}
                        />
                      ))}
                      {imagePreview && (
                        <Flex
                          height="130px"
                          width="100%"
                          bg={colorMode === "dark" ? "#383838" : "gray.100"}
                          borderRadius="10px"
                          flexDirection="column"
                          alignItems="center"
                          justifyContent="center"
                          color="gray.500"
                        >
                          <MdOutlineAddPhotoAlternate size="25px" />
                          <Text fontSize="sm">Add photo</Text>
                        </Flex>
                      )}
                    </SimpleGrid>
                    {!imagePreview && (
                      <Box textAlign="center" width="100%">
                        <IconButton
                          aria-label="photo"
                          icon={<MdOutlineAddPhotoAlternate size="25px" />}
                          isRound
                          height="42px"
                          width="42px"
                        />
                        <Text fontWeight="semibold" mt="5px">
                          Add Photos
                        </Text>
                        <Text color="gray.500">or drag and drop</Text>
                      </Box>
                    )}
                  </Flex>
                  <input
                    type="file"
                    accept=".jpeg, .png"
                    multiple
                    {...register("file")}
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  <FormControl isRequired>
                    <Input
                      placeholder="Title"
                      mb="10px"
                      {...register("productName")}
                      onChange={handleProductNameInputChange}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <Input
                      placeholder="Price"
                      mb="10px"
                      type="number"
                      {...register("price")}
                      onChange={handlePriceInputChange}
                    />
                  </FormControl>
                  <FormControl isRequired mb="10px">
                    <Select id="categories" {...register("category")}>
                      <option value="" hidden>
                        Category
                      </option>
                      {categories.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.name}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl isRequired mb="10px">
                    <Select
                      id="condition"
                      {...register("productCondition", {
                        onChange: (e) => {
                          handleConditionInputChange(e);
                        },
                      })}
                    >
                      <option value="" hidden>
                        Condition
                      </option>
                      {condition.map((condition) => (
                        <option key={condition.value} value={condition.value}>
                          {condition.condition}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl>
                    <Input
                      placeholder="Brand"
                      mb="10px"
                      {...register("brand")}
                      onChange={handleBrandInputChange}
                    />
                  </FormControl>
                  <FormControl mb="10px">
                    <Textarea
                      placeholder="Description"
                      height="120px"
                      {...register("description")}
                      onChange={handleDescriptionInputChange}
                    />
                  </FormControl>

                  <FormControl isRequired mb="10px">
                    <Select id="availability" {...register("availability")}>
                      <option value="" hidden>
                        Availability
                      </option>
                      <option value={"SINGLE"}>List as Single Item</option>
                      <option value={"IN_STOCK"}>List as In Stock</option>
                    </Select>
                  </FormControl>
                  <Button
                    width="100%"
                    bg="#1877F2"
                    _hover={{ bg: "#165BB7" }}
                    type="submit"
                    isLoading={loading}
                    isDisabled={
                      imageFile && productName && price ? false : true
                    }
                  >
                    Submit
                  </Button>
                </Box>
              </form>
            </GridItem>

            <GridItem
              area="section2"
              height={{ base: "auto", lg: "100vh" }}
              display="flex"
              justifyContent="center"
              alignItems="center"
              bg={colorMode === "dark" ? "gray.700" : "#F0F0F0"}
              mt="10px"
            >
              <Card
                height={{ base: "auto", lg: "80%", xl: "90%" }}
                width={{ base: "100%", lg: "85%", xl: "65%" }}
                bg={colorMode === "dark" ? "#262626" : "white"}
                padding={4}
              >
                <Text fontSize="large" fontWeight="bold" mb="10px">
                  Preview
                </Text>
                <Box
                  border="1px solid"
                  height="100%"
                  width="100%"
                  borderRadius="10px"
                  borderColor={colorMode === "dark" ? "#383838" : "gray.200"}
                  overflow="hidden"
                >
                  <Flex
                    height="100%"
                    flexDirection={{ base: "column", lg: "row" }}
                  >
                    <Flex
                      height="100%"
                      width="100%"
                      borderRight="1px solid"
                      borderColor={
                        colorMode === "dark" ? "#383838" : "gray.200"
                      }
                      justifyContent="center"
                      flexDirection="column"
                      alignItems="center"
                      position="relative"
                    >
                      {imageFile ? (
                        <>
                          <Image
                            src={
                              (imagePreview && imagePreview[currentIndex]) ||
                              undefined
                            }
                            width="100%"
                            height={{ base: "400px", md: "100%" }}
                          />
                          <Flex
                            justifyContent="center"
                            alignItems="center"
                            mt="50px"
                            mb="20px"
                            flexWrap="wrap"
                          >
                            {imagePreview?.map((image, index) => (
                              <Image
                                src={image}
                                key={index}
                                height="40px"
                                width="40px"
                                mr="5px"
                                mt={{ base: "10px", md: "0" }}
                                borderRadius="5px"
                                onClick={() => handleSelectImageClick(index)}
                                cursor="pointer"
                                filter={
                                  currentIndex === index
                                    ? "opacity(1)"
                                    : "opacity(0.3)"
                                }
                              />
                            ))}
                          </Flex>
                        </>
                      ) : (
                        <Flex
                          height="100%"
                          flexDirection="column"
                          alignItems="center"
                          justifyContent="center"
                          padding={{ base: 4, md: 10 }}
                          textAlign="center"
                        >
                          <Text
                            fontSize={{ base: "xl", md: "xx-large" }}
                            fontWeight="semibold"
                          >
                            Your listing preview
                          </Text>
                          <Text fontSize={{ base: "md", md: "x-large" }}>
                            As you create your listing, you can preview how it
                            will appear to others on Marketplace.
                          </Text>
                        </Flex>
                      )}
                      {imagePreview && imagePreview?.length > 1 && (
                        <>
                          <Box
                            position="absolute"
                            left="10px"
                            top={{ base: "180px", md: "initial" }}
                          >
                            <NextButton
                              direction="left"
                              nextClick={handleLeftNextClick}
                            />
                          </Box>
                          <Box
                            position="absolute"
                            right="10px"
                            top={{ base: "180px", md: "initial" }}
                          >
                            <NextButton
                              direction="right"
                              nextClick={handleRightNextClick}
                            />
                          </Box>
                        </>
                      )}
                    </Flex>
                    <Box padding={4} width={{ base: "100%", lg: "60%" }}>
                      <Text
                        fontSize="x-large"
                        fontWeight="semibold"
                        textTransform="capitalize"
                      >
                        {productName ? productName : "Title"}
                      </Text>
                      <Text fontSize="lg" fontWeight="semibold">
                        {price ? price + " VNĐ" : "Price"}
                      </Text>
                      <Text fontSize="lg" fontWeight="semibold" mt="20px">
                        Details
                      </Text>
                      {productCondition && (
                        <Flex mt="10px" justifyContent="space-between">
                          <Text fontWeight="semibold">Condition</Text>
                          <Text textAlign="end">{productCondition}</Text>
                        </Flex>
                      )}

                      {brand && (
                        <Flex justifyContent="space-between">
                          <Text fontWeight="semibold">Brand</Text>
                          <Text textTransform="capitalize">{brand}</Text>
                        </Flex>
                      )}
                      <Text mt="5px">
                        {description
                          ? description
                          : "Description will appear here."}
                      </Text>

                      <Divider mt="20px" mb="20px" width="100%" />
                      <Text fontSize="lg" fontWeight="semibold">
                        Seller Information
                      </Text>
                      <Flex alignItems="center" mt="10px" cursor="pointer">
                        <Avatar src={profilePicture || pic} size="md" />
                        <Text
                          textTransform="capitalize"
                          fontSize="lg"
                          fontWeight="semibold"
                          ml="10px"
                        >
                          {firstName} {lastName}
                        </Text>
                      </Flex>
                    </Box>
                  </Flex>
                </Box>
              </Card>
            </GridItem>
          </Grid>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateProductModal;
