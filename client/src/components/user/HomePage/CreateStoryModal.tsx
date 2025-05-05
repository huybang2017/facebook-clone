import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Image,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  Textarea,
  useColorMode,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useRef } from "react";
import { FaFacebook } from "react-icons/fa6";
import { IoMdImages } from "react-icons/io";
import { IoText } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import pic from "../../../assets/profpic.jpeg";
import useCreateStory from "../../../hooks/user/useCreateStory";
import { useStoryStore } from "../../../store/story-store";
import { useUserStore } from "../../../store/user-store";

const CreateStoryModal = () => {
  const { profilePicture, firstName, lastName } = useUserStore();
  const { isOpen, onClose } = useStoryStore();
  const { colorMode } = useColorMode();
  const navigate = useNavigate();

  const handleNavigateClick = () => {
    navigate("/home");
    onClose();
  };

  const {
    register,
    handleSubmit,
    onSubmit,
    loading,
    setValue,
    text,
    setText,
    imageFile,
    setImageFile,
    setImagePreview,
    imagePreview,
    isTextStory,
    setIsTextStory,
    isPhotoStory,
    setIsPhotoStory,
  } = useCreateStory();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const inputTextPhotoRef = useRef<HTMLTextAreaElement | null>(null);

  const resetStoryState = () => {
    setIsTextStory(false);
    setIsPhotoStory(false);
    setImagePreview(null);
    setImageFile(null);
    setText("");
    setValue("file", undefined);
    setValue("text", "");
  };

  const handleModalCloseClick = () => {
    onClose();
    resetStoryState();
  };

  const handleDiscardClick = () => {
    resetStoryState();
  };

  const handleFileInputClick = () => {
    if (isTextStory) {
      setIsTextStory(false);
    }
    fileInputRef.current?.click();
  };

  const handleTextAreaClick = () => {
    setIsTextStory(true);
    inputRef.current?.focus();
  };

  const handlePhotoTextAreaClick = () => {
    setIsPhotoStory(true);
    inputTextPhotoRef.current?.focus();
  };

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setValue("text", e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setValue("file", file);
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  useEffect(() => {
    if (!imagePreview) return;

    return () => {
      URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const handleNavigateStoryClick = () => {
    navigate("/stories");
    onClose();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleModalCloseClick}
        size="full"
        trapFocus={false}
      >
        <ModalOverlay />
        <ModalContent>
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
            >
              <Box mb="70px">
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

              <Text fontSize="x-large" ml="10px" fontWeight="bold">
                Your story
              </Text>
              <Flex
                alignItems="center"
                mt="20px"
                cursor="pointer"
                onClick={handleNavigateStoryClick}
              >
                <Avatar src={profilePicture || pic} size="lg" ml="10px" />
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
                mb={{ base: "0px", lg: "20px" }}
              />

              {imageFile && (
                <Flex
                  alignItems="center"
                  padding="10px"
                  borderRadius="5px"
                  _hover={{
                    bg: colorMode === "dark" ? "#303030" : "gray.200",
                  }}
                  cursor="pointer"
                  userSelect="none"
                  ml="10px"
                  mr="10px"
                  mb="10px"
                  onClick={handlePhotoTextAreaClick}
                  mt={{ base: "10px", lg: "0" }}
                >
                  <IconButton
                    aria-label="close"
                    icon={<IoText size="20px" />}
                    bg={colorMode === "dark" ? "#383838" : "gray.100"}
                    _hover={{
                      bg: colorMode === "dark" ? "#383838" : "gray.100",
                    }}
                    isRound
                    size="md"
                  />
                  <Text ml="10px" fontWeight="semibold">
                    Add text
                  </Text>
                </Flex>
              )}

              {(isTextStory || isPhotoStory) && (
                <Box padding={2}>
                  <Textarea
                    placeholder="Start typing"
                    height={{ base: "auto", lg: "150px" }}
                    onChange={handleTextChange}
                    ref={inputRef}
                    resize="none"
                  />
                </Box>
              )}

              <form onSubmit={handleSubmit(onSubmit)}>
                <>
                  {(text || imageFile) && (
                    <Flex
                      position={{ base: "relative", lg: "absolute" }}
                      mt={{ base: "30px", lg: "0" }}
                      ml={{ base: "10px", lg: "0" }}
                      bottom="20px"
                      left="50%"
                      transform="translateX(-50%)"
                    >
                      <Button mr="10px" onClick={handleDiscardClick}>
                        Discard
                      </Button>
                      <Button
                        bg="#1877F2"
                        _hover={{ bg: "#165BB7" }}
                        type="submit"
                        isLoading={loading}
                      >
                        Share to story
                      </Button>
                    </Flex>
                  )}
                </>
              </form>
            </GridItem>
            <GridItem
              area="section2"
              height={{ base: "auto", lg: "100vh" }}
              display="flex"
              justifyContent="center"
              alignItems="center"
              bg={colorMode === "dark" ? "gray.700" : "#F0F0F0"}
            >
              {text || imageFile ? (
                <Card
                  height={{ base: "60vh", md: "90vh" }}
                  width={{ base: "100%", lg: "85%", xl: "60%" }}
                  bg={colorMode === "dark" ? "#262626" : "white"}
                  padding={4}
                >
                  <Text fontSize="large" fontWeight="bold">
                    Preview
                  </Text>
                  <Card
                    bg="gray.800"
                    height="100%"
                    mt="10px"
                    border="1px solid"
                    borderColor="#404040"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Card
                      bg={
                        // imageFile
                        //   ? "#262626"
                        "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)"
                      }
                      height="90%"
                      width={{ base: "80%", lg: "60%", xl: "45%" }}
                      border="1px solid"
                      borderColor="gray.500"
                      overflow="hidden"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      {text && (
                        <Box padding={4}>
                          <Text
                            fontSize="xl"
                            fontWeight="semibold"
                            textAlign="center"
                          >
                            {text}
                          </Text>
                        </Box>
                      )}
                      {imageFile && (
                        <Flex
                          position="relative"
                          justifyContent="center"
                          alignItems="center"
                        >
                          {/* <Text
                            // position="absolute"
                            padding={4}
                            fontSize={{ base: "md", md: "x-large" }}
                          >
                            {text}
                          </Text> */}
                          <Image src={imagePreview || pic} />
                        </Flex>
                      )}
                    </Card>
                  </Card>
                </Card>
              ) : (
                <Flex mt={{ base: "20px", lg: "0" }}>
                  <Card
                    height={{ base: "250px", md: "330px" }}
                    width={{ base: "150px", md: "220px" }}
                    bgGradient="linear(to-t, #30cfd0 0%, #330867 100%)"
                    justifyContent="center"
                    _hover={{ filter: "brightness(1.1)" }}
                    onClick={handleFileInputClick}
                    cursor="pointer"
                  >
                    <Box textAlign="center">
                      <IconButton
                        aria-label="image_story"
                        icon={<IoMdImages size="20px" />}
                        bg={colorMode === "dark" ? "#303030" : "gray.100"}
                        _hover={{
                          bg: colorMode === "dark" ? "#383838" : "gray.200",
                        }}
                        isRound
                        size="md"
                      />
                      <Text
                        fontWeight="semibold"
                        mt="5px"
                        fontSize={{ base: "sm", md: "md" }}
                      >
                        Create a photo story
                      </Text>
                      <input
                        type="file"
                        accept=".jpeg, .png"
                        {...register("file")}
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                      />
                    </Box>
                  </Card>
                  <Card
                    height={{ base: "250px", md: "330px" }}
                    width={{ base: "150px", md: "220px" }}
                    bgGradient="linear(to-tr, #f093fb 0%, #f5576c 100%)"
                    ml={{ base: "10px", lg: "20px" }}
                    justifyContent="center"
                    _hover={{ filter: "brightness(1.1)" }}
                    onClick={handleTextAreaClick}
                    cursor="pointer"
                  >
                    <Box textAlign="center">
                      <IconButton
                        aria-label="text_story"
                        icon={<IoText size="20px" />}
                        bg={colorMode === "dark" ? "#303030" : "gray.100"}
                        _hover={{
                          bg: colorMode === "dark" ? "#383838" : "gray.200",
                        }}
                        isRound
                        size="md"
                      />
                      <Text
                        fontWeight="semibold"
                        mt="5px"
                        fontSize={{ base: "sm", md: "md" }}
                      >
                        Create a text story
                      </Text>
                    </Box>
                  </Card>
                </Flex>
              )}
            </GridItem>
          </Grid>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateStoryModal;
