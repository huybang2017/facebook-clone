import {
  Box,
  Card,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "../../../entities/Post";
import useFetchAllPostComments from "../../../hooks/user/useFetchAllPostComments";
import useWritePostComment from "../../../hooks/user/useWritePostComment";
import Comments from "./Comments";
import LikeCommentShareButton from "./LikeCommentShareButton";
import PostContent from "./PostContent";
import PostImages from "./PostImages";
import PostShareContent from "./PostShareContent";
import PostShareImages from "./PostShareImages";
import WriteComment from "./WriteComment";
import useGetLastPostComment from "../../../hooks/user/useGetLastPostComment";

export interface PostProps {
  posts: Post;
}

const Posts = ({ posts }: PostProps) => {
  const { colorMode } = useColorMode();
  const initialRef = useRef<HTMLInputElement | null>(null);
  const finalRef = useRef<HTMLInputElement | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  const {
    data: fetchAllPostComments,
    fetchNextPage,
    hasNextPage,
  } = useFetchAllPostComments({
    postId: posts.postId,
    pageSize: 10,
  });

  const postCommentList =
    fetchAllPostComments?.pages.flatMap((page) => page.postCommentList) || [];

  const postCommentSize = postCommentList.length >= 2;

  const fetchedCommentData =
    fetchAllPostComments?.pages.reduce(
      (total, page) => total + page.postCommentList.length,
      0
    ) || 0;
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const handleFocusInputClick = () => {
    if (isModalOpen) {
      initialRef.current?.focus();
      setIsClicked(true);
    } else {
      finalRef.current?.focus();
      setIsClicked(true);
    }
  };

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
  } = useWritePostComment(posts.postId);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleInputClick = () => {
    if (isModalOpen) {
      fileInputRef.current?.click();
    } else {
      inputRef.current?.click();
    }
  };

  const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
    setValue("comment", e.target.value);
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

  const { data: getLastPostComment } = useGetLastPostComment(posts.postId);

  return (
    <>
      <Card padding={3} mt="10px">
        {posts.guestPoster && posts.guestPoster ? (
          <PostContent
            firstName={posts.guestPoster.firstName}
            lastName={posts.guestPoster.lastName}
            postUserId={posts.guestPoster.userId}
            profilePicture={posts.guestPoster.profilePicture}
            timestamp={posts.timestamp}
            postId={posts.postId}
            content={posts.content}
          />
        ) : (
          <PostContent
            firstName={posts.firstName}
            lastName={posts.lastName}
            postUserId={posts.userId}
            profilePicture={posts.profilePicture}
            timestamp={posts.timestamp}
            postId={posts.postId}
            content={posts.content}
          />
        )}
        {posts.postImages && <PostImages posts={posts} />}
        {posts.sharedPost && (
          <Card
            border="1px solid"
            borderColor={colorMode === "dark" ? "#383838" : "gray.200"}
            borderRadius="20px"
          >
            <Box overflow="hidden" borderTopRadius="20px">
              {posts.sharedPost.postImages && <PostShareImages posts={posts} />}
            </Box>
            {posts.sharedPost.guestPoster && posts.sharedPost.guestPoster ? (
              <PostShareContent
                firstName={posts.sharedPost.guestPoster.firstName}
                lastName={posts.sharedPost.guestPoster.lastName}
                postUserId={posts.sharedPost.guestPoster.userId}
                profilePicture={posts.sharedPost.guestPoster.profilePicture}
                timestamp={posts.sharedPost.timestamp}
                content={posts.sharedPost.content}
              />
            ) : (
              <PostShareContent
                firstName={posts.sharedPost.firstName}
                lastName={posts.sharedPost.lastName}
                postUserId={posts.sharedPost.userId}
                profilePicture={posts.sharedPost.profilePicture}
                timestamp={posts.sharedPost.timestamp}
                content={posts.sharedPost.content}
              />
            )}
          </Card>
        )}
        <LikeCommentShareButton
          posts={posts}
          onOpen={onOpen}
          handleFocusInputClick={handleFocusInputClick}
        />
        <Divider mt="5px" mb="5px" color="gray.500" />
        {postCommentSize && (
          <Text
            onClick={onOpen}
            cursor="pointer"
            color="gray.500"
            fontWeight="semibold"
          >
            View more comments
          </Text>
        )}
        {getLastPostComment && (
          <Comments
            key={getLastPostComment?.postCommentId}
            comments={getLastPostComment}
          />
        )}
        <Box mt="10px">
          <WriteComment
            focusRef={finalRef}
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            loading={loading}
            comment={comment}
            imageFile={imageFile}
            handleInputClick={handleInputClick}
            handleCommentChange={handleCommentChange}
            fileInputRef={inputRef}
            handleFileChange={handleFileChange}
            imagePreview={imagePreview}
            removeImageClick={handleRemoveImagePreviewClick}
            isClicked={isClicked}
            setIsClicked={setIsClicked}
          />
        </Box>
      </Card>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        // preserveScrollBarGap={true}
      >
        <ModalOverlay />
        <ModalContent maxWidth={{ base: "90%", lg: "70%", xl: "40%" }}>
          <ModalHeader
            position="sticky"
            top="0"
            zIndex={10}
            textTransform="capitalize"
            textAlign="center"
            bg={colorMode === "dark" ? "gray.700" : "white"}
            borderBottom="1px solid"
            borderColor={colorMode === "dark" ? "gray.500" : "gray.200"}
          >
            {posts.guestPoster
              ? `${posts.guestPoster.firstName} ${posts.guestPoster.lastName}`
              : `${posts.firstName} ${posts.lastName}`}
            's Post
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody
            maxHeight="650px"
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
            {posts.guestPoster && posts.guestPoster ? (
              <PostContent
                firstName={posts.guestPoster.firstName}
                lastName={posts.guestPoster.lastName}
                postUserId={posts.guestPoster.userId}
                profilePicture={posts.guestPoster.profilePicture}
                timestamp={posts.timestamp}
                postId={posts.postId}
                content={posts.content}
              />
            ) : (
              <PostContent
                firstName={posts.firstName}
                lastName={posts.lastName}
                postUserId={posts.userId}
                profilePicture={posts.profilePicture}
                timestamp={posts.timestamp}
                postId={posts.postId}
                content={posts.content}
              />
            )}
            {posts.postImages && <PostImages posts={posts} />}
            {posts.sharedPost && (
              <Card
                border="1px solid"
                borderColor={colorMode === "dark" ? "#383838" : "gray.200"}
                borderRadius="20px"
              >
                <Box overflow="hidden" borderTopRadius="20px">
                  {posts.sharedPost.postImages && (
                    <PostShareImages posts={posts} />
                  )}
                </Box>
                {posts.sharedPost.guestPoster &&
                posts.sharedPost.guestPoster ? (
                  <PostShareContent
                    firstName={posts.sharedPost.guestPoster.firstName}
                    lastName={posts.sharedPost.guestPoster.lastName}
                    postUserId={posts.sharedPost.guestPoster.userId}
                    profilePicture={posts.sharedPost.guestPoster.profilePicture}
                    timestamp={posts.sharedPost.timestamp}
                    content={posts.sharedPost.content}
                  />
                ) : (
                  <PostShareContent
                    firstName={posts.sharedPost.firstName}
                    lastName={posts.sharedPost.lastName}
                    postUserId={posts.sharedPost.userId}
                    profilePicture={posts.sharedPost.profilePicture}
                    timestamp={posts.sharedPost.timestamp}
                    content={posts.sharedPost.content}
                  />
                )}
              </Card>
            )}
            <LikeCommentShareButton
              posts={posts}
              onOpen={onOpen}
              handleFocusInputClick={handleFocusInputClick}
            />
            <Divider mt="5px" mb="5px" color="gray.500" />
            <InfiniteScroll
              dataLength={fetchedCommentData}
              next={fetchNextPage}
              hasMore={!!hasNextPage}
              loader={<Spinner />}
              scrollableTarget="scrollable-body"
            >
              {fetchAllPostComments?.pages.map((page) =>
                page.postCommentList.map((comments) => (
                  <Comments key={comments.postCommentId} comments={comments} />
                ))
              )}
            </InfiniteScroll>
          </ModalBody>

          <Divider />
          <Box position="sticky" bottom="0" zIndex={10}>
            <Box padding={3} ml="12px">
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
                isClicked={isClicked}
                setIsClicked={setIsClicked}
              />
            </Box>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Posts;
