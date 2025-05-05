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
  Spacer,
  Spinner,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { BiSolidLike } from "react-icons/bi";
import { FaComment } from "react-icons/fa";
import { IoIosShareAlt } from "react-icons/io";
import InfiniteScroll from "react-infinite-scroll-component";
import PostImage from "../../../entities/PostImage";
import useGetPostImageCommentCount from "../../../hooks/user/useGetPostImageCommentCount";
import useGetPostImageLike from "../../../hooks/user/useGetPostImageLike";
import useGetPostImageLikeCount from "../../../hooks/user/useGetPostImageLikeCount";
import useGetPostImageLikeUserList from "../../../hooks/user/useGetPostImageLikeUserList";
import useGetPostImageShareCount from "../../../hooks/user/useGetPostImageShareCount";
import useLikePostImage from "../../../hooks/user/useLikePostImage";
import useSharePostImage from "../../../hooks/user/useSharePostImage";
import SharePostModal from "./SharePostModal";
import UserListModel from "./UserListModel";

export interface PostImageProps {
  activeImage: PostImage | null;
  focusInputClick: () => void;
  postId: number;
}

const PostImagesButtons = ({
  activeImage,
  focusInputClick,
  postId,
}: PostImageProps) => {
  const postImageId = activeImage?.postImageId ?? 0;
  const { colorMode } = useColorMode();
  const { mutate: likePostImage } = useLikePostImage();
  const { data: postImageLike } = useGetPostImageLike(postImageId);
  const { data: postImageLikeCount } = useGetPostImageLikeCount(postImageId);
  const { data: postImageCommentCount } =
    useGetPostImageCommentCount(postImageId);
  const { data: getImageShareCount } = useGetPostImageShareCount(postImageId);

  const handleLikePostImageClick = () => {
    likePostImage(postImageId);
  };
  const {
    register,
    loading,
    handleSubmit,
    onSubmit,
    setValue,
    isSuccessful,
    setIsSuccessful,
  } = useSharePostImage(postId, postImageId);

  const boxStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    width: "100%",
    _hover: {
      bg: colorMode === "dark" ? "#303030" : "gray.100",
    },
    borderRadius: "5px",
  };
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const {
    isOpen: isOpenShareModal,
    onOpen: onOpenShareModal,
    onClose: onCloseShareModal,
  } = useDisclosure();

  const {
    data: postImageLikeUserList,
    fetchNextPage,
    hasNextPage,
  } = useGetPostImageLikeUserList({
    postImageId: postImageId,
    pageSize: 10,
  });

  const {
    isOpen: isOpenLikeList,
    onOpen: onOpenLikeList,
    onClose: onCloseLikeList,
  } = useDisclosure();

  const fetchedPostData =
    postImageLikeUserList?.pages.reduce(
      (total, page) => total + page.userList.length,
      0
    ) || 0;

  const count = postImageLikeCount?.postLikeCount ?? 0;
  const likeCount = count - 3;

  return (
    <>
      <Box display="flex" alignItems="center" ml="12px" mr="12px" height="30px">
        {postImageLikeCount && postImageLikeCount.postLikeCount >= 1 && (
          <Box
            display="flex"
            alignItems="center"
            onClick={onOpenLikeList}
            cursor="pointer"
            userSelect="none"
          >
            <Box
              border="1px solid"
              borderRadius="full"
              width="20px"
              height="20px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderColor="#1877F2"
              bg="#1877F2"
              mr="5px"
              cursor="pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <BiSolidLike size="14px" />
            </Box>
            <Text>
              {postImageLike?.liked
                ? postImageLikeCount.postLikeCount > 1
                  ? `You and ${postImageLikeCount.postLikeCount - 1} others`
                  : "You"
                : postImageLikeCount.postLikeCount > 0
                ? `${postImageLikeCount.postLikeCount} ${
                    postImageLikeCount.postLikeCount === 1 ? "like" : "likes"
                  }`
                : ""}
            </Text>
          </Box>
        )}
        {isHovered && (
          <Card
            bg="gray.100"
            width="fit-content"
            height="auto"
            padding={2}
            color="black"
            zIndex={100}
            position="absolute"
            mb={count > 3 ? "150px" : "110px"}
          >
            <Text fontWeight="semibold" fontSize="md">
              Like
            </Text>
            {postImageLikeUserList?.pages.map((page, pageIndex) =>
              pageIndex === 0
                ? page.userList.slice(0, 3).map((user) => (
                    <Text
                      key={user.uniqueId}
                      fontSize="sm"
                      textTransform="capitalize"
                    >
                      {user.firstName} {user.lastName}
                    </Text>
                  ))
                : null
            )}
            {count > 3 && <Text fontSize="sm">and {likeCount} more...</Text>}
          </Card>
        )}
        <Spacer />
        {postImageCommentCount &&
          postImageCommentCount?.postCommentCount >= 1 && (
            <Box display="flex" alignItems="center" mr="10px">
              <Text mr="5px">{postImageCommentCount?.postCommentCount}</Text>
              <FaComment size="20px" />
            </Box>
          )}
        {getImageShareCount && getImageShareCount.sharedPostCount >= 1 && (
          <Box display="flex" alignItems="center">
            <Text mr="3px">{getImageShareCount?.sharedPostCount}</Text>
            <IoIosShareAlt size="25px" />
          </Box>
        )}
      </Box>
      <Divider mt="5px" mb="5px" borderColor="gray.500" />
      <Box display="flex" justifyContent="space-around" height="30px">
        <Box
          {...boxStyles}
          onClick={handleLikePostImageClick}
          color={postImageLike?.liked ? "#1877F2" : "white.500"}
        >
          <BiSolidLike size="20px" />
          <Text ml="5px" fontWeight="semibold">
            Like
          </Text>
        </Box>
        <Box {...boxStyles} onClick={focusInputClick}>
          <FaComment size="20px" />
          <Text ml="5px" fontWeight="semibold">
            Comment
          </Text>
        </Box>
        <Box {...boxStyles} onClick={onOpenShareModal}>
          <IoIosShareAlt size="25px" />
          <Text ml="5px" fontWeight="semibold">
            Share
          </Text>
        </Box>
        <SharePostModal
          isOpen={isOpenShareModal}
          onClose={onCloseShareModal}
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          loading={loading}
          setValue={setValue}
          isSuccessful={isSuccessful}
          setIsSuccessful={setIsSuccessful}
        />
      </Box>

      <Modal
        isOpen={isOpenLikeList}
        onClose={onCloseLikeList}
        size="2xl"
        isCentered
      >
        <ModalOverlay />
        <ModalContent height="500px">
          <ModalHeader>All Likes</ModalHeader>
          <ModalCloseButton />
          <ModalBody maxHeight="400px" overflowY="auto" id="list-body">
            <InfiniteScroll
              dataLength={fetchedPostData}
              next={fetchNextPage}
              hasMore={!!hasNextPage}
              loader={<Spinner />}
              scrollableTarget="list-body"
            >
              {postImageLikeUserList?.pages.map((page) =>
                page.userList.map((users) => (
                  <UserListModel key={users.userId} users={users} />
                ))
              )}
            </InfiniteScroll>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PostImagesButtons;
