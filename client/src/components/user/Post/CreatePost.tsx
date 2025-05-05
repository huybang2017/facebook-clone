import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Flex,
  FormControl,
  IconButton,
  Image,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useColorMode,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import pic from "../../../assets/profpic.jpeg";
import useCreatePost from "../../../hooks/user/useCreatePost";
import { useProfileStore } from "../../../store/profile-store";
import { useUserStore } from "../../../store/user-store";
import { getFlexBasis } from "../../../utilities/flexBasis";

interface Props {
  firstName: string | null;
}

const CreatePost = ({ firstName }: Props) => {
  const params = useParams<{ userId: string }>();
  const userId = Number(params.userId);
  const {
    firstName: currentFirstName,
    lastName,
    profilePicture,
    userId: currentUserId,
  } = useUserStore();
  const location = useLocation();
  const getUserId = location.pathname.startsWith("/profile")
    ? userId
    : currentUserId ?? 0;
  const {
    onSubmit,
    register,
    handleSubmit,
    loading,
    isOpen,
    onOpen,
    onClose,
    post,
    setPost,
    imageFile,
    setImageFile,
    setValue,
    setImagePreview,
    imagePreview,
  } = useCreatePost(getUserId);
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const { colorMode } = useColorMode();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handlePostInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPost(e.target.value);
    setValue("content", e.target.value);
  };

  const handleFileInput = (files: FileList | null) => {
    if (files && files.length > 0) {
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

  const { setIsProfile } = useProfileStore();
  const navigate = useNavigate();
  const handleNavigateProfileClick = () => {
    navigate(`/profile/${currentUserId}`);
    setIsProfile(true);
  };

  const handleInputClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    if (!imagePreview) return;

    return () => {
      imagePreview.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imagePreview]);
  const gap = imagePreview && imagePreview?.length + 1 - 6;
  const [isHover, setIsHover] = useState<boolean>(false);

  const handleRemoveImageClick = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const name = `${firstName?.charAt(0).toUpperCase()}${firstName?.slice(1)}`;
  const message =
    location.pathname === "/home" || currentUserId === userId
      ? `What's on your mind, ${name}?`
      : `Write something to ${name}...`;

  return (
    <>
      <Card padding={3}>
        <Box display="flex" alignItems="center">
          <Avatar src={profilePicture || pic} size="sm" mr="10px" />
          <Input
            borderRadius={20}
            placeholder={message}
            variant="filled"
            textAlign="left"
            fontSize={["sm", "md", "lg"]}
            width="100%"
            value={post}
            onChange={handlePostInputChange}
            onClick={onOpen}
            cursor="pointer"
          />
        </Box>
        <Divider mt="10px" mb="10px" color="gray.500" />
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={onOpen}
          cursor="pointer"
        >
          <MdOutlineAddPhotoAlternate size="30px" color="green" />
          <Text ml="5px">Photo</Text>
        </Box>
      </Card>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        isCentered
      >
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader textAlign="center">Create Post</ModalHeader>
            <ModalCloseButton />
            <Divider />
            <Box padding={4}>
              <Box display="flex" alignItems="center" mb="10px">
                <Avatar
                  src={profilePicture || pic}
                  height="30px"
                  width="30px"
                  onClick={handleNavigateProfileClick}
                  cursor="pointer"
                />

                <Text
                  ml="10px"
                  textTransform="capitalize"
                  onClick={handleNavigateProfileClick}
                  cursor="pointer"
                >
                  {currentFirstName} {lastName}
                </Text>
              </Box>
              <FormControl>
                <Textarea
                  {...register("content")}
                  ref={initialRef}
                  placeholder={message}
                  onClick={onOpen}
                  border="none"
                  _focus={{ border: "none", boxShadow: "none" }}
                  _hover={{ border: "none" }}
                  resize="none"
                  onChange={handlePostInputChange}
                />
              </FormControl>
              {imagePreview && (
                <Box
                  display="flex"
                  flexWrap="wrap"
                  gap={1}
                  mb="10px"
                  mt="10px"
                  padding={2}
                  border="0.2px solid"
                  borderColor="gray.500"
                  borderRadius="10px"
                  position="relative"
                >
                  <Box
                    onClick={handleRemoveImageClick}
                    position="absolute"
                    top="5px"
                    right="5px"
                    zIndex={50}
                    color="gray.500"
                    cursor="pointer"
                  >
                    <IoMdCloseCircle size="40px" />
                  </Box>
                  {imagePreview?.slice(0, 6).map((image, index) => (
                    <Box
                      key={index}
                      flexBasis={getFlexBasis(index, imagePreview.length)}
                      flexGrow={1}
                      position="relative"
                      cursor="pointer"
                    >
                      <Image
                        src={image}
                        key={index}
                        flexBasis={getFlexBasis(index, imagePreview.length)}
                        flexGrow={1}
                        width="100%"
                        minHeight="100%"
                        height="auto"
                        filter={
                          imagePreview.length > 6 && index === 5
                            ? "brightness(0.3)"
                            : "none"
                        }
                        borderRadius="10px"
                      />
                      {imagePreview.length > 6 && index === 5 && (
                        <Text
                          position="absolute"
                          top="50%"
                          left="50%"
                          transform="translate(-50%, -50%)"
                          color="white"
                          fontSize={{
                            base: "x-large",
                            md: "xx-large",
                            lg: "xxx-large",
                          }}
                          fontWeight="semibold"
                        >
                          +{gap}
                        </Text>
                      )}
                    </Box>
                  ))}
                </Box>
              )}
              {!imageFile && (
                <Flex
                  height="180px"
                  border="1px solid"
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
                  <Box textAlign="center" width="100%">
                    <IconButton
                      aria-label="image"
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
                </Flex>
              )}

              <Flex
                border="1px solid"
                justifyContent="space-between"
                alignItems="center"
                borderRadius="10px"
                padding={3}
                borderColor={colorMode === "dark" ? "#383838" : "gray.200"}
              >
                <Text ml="10px" userSelect="none">
                  Add to your post
                </Text>
                <Box
                  mr="10px"
                  cursor="pointer"
                  onClick={handleInputClick}
                  onMouseEnter={() => setIsHover(true)}
                  onMouseLeave={() => setIsHover(false)}
                  position="relative"
                >
                  {isHover && (
                    <Card
                      padding={2}
                      position="absolute"
                      bottom="35px"
                      bg="gray.500"
                      right="0px"
                    >
                      <Text fontSize="xs">Photo</Text>
                    </Card>
                  )}
                  <MdOutlineAddPhotoAlternate size="30px" color="green" />
                </Box>
                <input
                  type="file"
                  accept=".jpeg, .png"
                  multiple
                  {...register("file")}
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </Flex>
              <Button
                type="submit"
                width="100%"
                bg="#1877F2"
                _hover={{ bg: "#165BB7" }}
                mt="20px"
                isDisabled={post || imageFile ? false : true}
                isLoading={loading}
              >
                Post
              </Button>
            </Box>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default CreatePost;
