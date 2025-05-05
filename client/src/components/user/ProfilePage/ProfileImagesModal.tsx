import {
  Box,
  Card,
  Divider,
  Grid,
  GridItem,
  Image,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Show,
  Spinner,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FaFacebook } from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { Images } from "../../../entities/PostImage";
import useFetchAllPostImageComments from "../../../hooks/user/useFetchAllPostImageComments";
import useGetPostCreatorById from "../../../hooks/user/useGetPostCreatorById";
import useWritePostImageComment from "../../../hooks/user/useWritePostImageComment";
import { useChatStore } from "../../../store/chat-store";
import { usePostStore } from "../../../store/post-store";
import NextButton from "../Buttons/NextButton";
import Comments from "../Post/Comments";
import PostContent from "../Post/PostContent";
import PostImagesButtons from "../Post/PostImagesButtons";
import WriteComment from "../Post/WriteComment";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  activeImage: Images | null;
  nextRightImage: () => void;
  nextLeftImage: () => void;
  imageList: Images[];
}

const ProfileImagesModal = ({
  isOpen,
  onClose,
  activeImage,
  nextRightImage,
  nextLeftImage,
  imageList,
}: Props) => {
  const { data: getPost } = useGetPostCreatorById(activeImage?.postId ?? 0);
  const isSmallScreen = useBreakpointValue({ base: true, lg: false });
  const isLargeScreen = useBreakpointValue({ base: false, lg: true });
  const { chatArray } = useChatStore();

  const {
    data: fetchAllPostImageComments,
    fetchNextPage,
    hasNextPage,
  } = useFetchAllPostImageComments({
    postImageId: activeImage?.postImageId ?? 0,
    pageSize: 10,
  });

  const fetchedCommentData =
    fetchAllPostImageComments?.pages.reduce(
      (total, page) => total + page.postCommentList.length,
      0
    ) || 0;

  const {
    register,
    handleSubmit,
    onSubmit,
    loading,
    setValue,
    comment,
    setComment,
    imageFile,
    setImageFile,
    setImagePreview,
    imagePreview,
  } = useWritePostImageComment(activeImage?.postImageId ?? 0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const initialRef = useRef<HTMLInputElement | null>(null);
  const finalRef = useRef<HTMLInputElement | null>(null);
  const handleInputClick = () => {
    fileInputRef.current?.click();
  };

  const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
    setValue("comment", e.target.value);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setValue("file", file);
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const handleRemoveImagePreviewClick = () => {
    setImagePreview(null);
    setImageFile(null);
    setValue("file", undefined);
  };

  useEffect(() => {
    if (!imagePreview) return;

    return () => {
      URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);
  const [_isClicked, setIsClicked] = useState<boolean>(false);
  const handleFocusInputClick = () => {
    initialRef.current?.focus();
    setIsClicked(true);
  };
  const { setIsPostImageModalOpen } = usePostStore();
  const handleCloseModalClick = () => {
    onClose();
    setIsPostImageModalOpen(false);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleCloseModalClick}
        size="full"
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        trapFocus={chatArray.length >= 1 ? false : true}
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
              height={{ base: "auto", lg: "100vh", xl: "100%" }}
              display={isLargeScreen ? "flex" : "block"}
              justifyContent={isLargeScreen ? "center" : undefined}
              alignItems={isLargeScreen ? "center" : undefined}
            >
              {isSmallScreen && <Box padding={5} mt="60px" />}
              <Box display="flex" alignItems="center" justifyContent="center">
                {imageList.length > 1 && isSmallScreen && (
                  <Box
                    position={isSmallScreen ? "absolute" : "static"}
                    left={isSmallScreen ? "0px" : undefined}
                    ml={isSmallScreen ? "5px" : "0px"}
                  >
                    <NextButton direction="left" nextClick={nextLeftImage} />
                  </Box>
                )}

                <Box ml="5px" mr="5px">
                  <Image
                    src={activeImage?.postImageUrl}
                    overflow="hidden"
                    width="auto"
                    height={{ base: "200px", md: "400px", xl: "100vh" }}
                    objectFit="contain"
                  />
                </Box>

                {imageList.length > 1 && isSmallScreen && (
                  <Box
                    position={isSmallScreen ? "absolute" : "static"}
                    right={isSmallScreen ? "0px" : undefined}
                    mr={isSmallScreen ? "5px" : "0px"}
                  >
                    <NextButton direction="right" nextClick={nextRightImage} />
                  </Box>
                )}
              </Box>
              {isSmallScreen && <Box padding={5} />}
            </GridItem>
            <GridItem area="section2" height="100%" position="relative">
              {isLargeScreen && (
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
              )}

              <Box
                width={chatArray.length >= 1 && isLargeScreen ? "80%" : "100%"}
                borderRight={
                  isLargeScreen && chatArray.length >= 1 ? "1px solid" : "none"
                }
                borderColor="gray.500"
                height={isLargeScreen ? "93.4%" : undefined}
                mt={{ base: "0", lg: "60px" }}
              >
                <Box>
                  {getPost && (
                    <Box padding={3}>
                      <PostContent
                        firstName={getPost?.firstName}
                        lastName={getPost?.lastName}
                        postUserId={getPost?.userId}
                        profilePicture={getPost?.profilePicture}
                        timestamp={getPost?.postTimestamp}
                        postId={getPost?.postId}
                        content={getPost?.content}
                      />
                    </Box>
                  )}

                  <PostImagesButtons
                    activeImage={activeImage}
                    focusInputClick={handleFocusInputClick}
                    postId={getPost?.postId ?? 0}
                  />
                </Box>
                <Divider mt="5px" borderColor="gray.500" />

                <Box
                  padding={3}
                  height="auto"
                  maxHeight={{ base: "400px", lg: "610px" }}
                  overflowY="auto"
                  id="scrollable-body"
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
                  <InfiniteScroll
                    dataLength={fetchedCommentData}
                    next={fetchNextPage}
                    hasMore={!!hasNextPage}
                    loader={<Spinner />}
                    scrollableTarget="scrollable-body"
                  >
                    {fetchAllPostImageComments?.pages.map((page) =>
                      page.postCommentList.map((comments) => (
                        <Comments
                          key={comments.postCommentId}
                          comments={comments}
                        />
                      ))
                    )}
                  </InfiniteScroll>
                </Box>

                <Box
                  padding={3}
                  position={{ base: "static", xl: "absolute" }}
                  bottom="0"
                  width={
                    chatArray.length >= 1 && isLargeScreen ? "80%" : "100%"
                  }
                >
                  <WriteComment
                    focusRef={initialRef}
                    register={register}
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                    loading={loading}
                    comment={comment}
                    imageFile={imageFile}
                    handleInputClick={handleInputClick}
                    handleCommentChange={handleCommentChange}
                    fileInputRef={fileInputRef}
                    handleFileChange={handleFileChange}
                    imagePreview={imagePreview}
                    removeImageClick={handleRemoveImagePreviewClick}
                    isClicked={true}
                    setIsClicked={setIsClicked}
                  />
                </Box>
              </Box>
            </GridItem>
            <Show above="lg">
              <GridItem area="leftButton" bg="black">
                <Box position="absolute" top="50%" bottom="50%" ml="10px">
                  <NextButton direction="left" nextClick={nextLeftImage} />
                </Box>
              </GridItem>
              <GridItem area="rightButton" bg="black">
                <Box position="absolute" top="50%" bottom="50%">
                  <NextButton direction="right" nextClick={nextRightImage} />
                </Box>
              </GridItem>
            </Show>
          </Grid>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileImagesModal;
