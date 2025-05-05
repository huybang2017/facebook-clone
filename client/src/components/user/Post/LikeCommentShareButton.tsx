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
  useBreakpointValue,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { BiSolidLike } from "react-icons/bi";
import { FaComment } from "react-icons/fa";
import { IoIosShareAlt } from "react-icons/io";
import { PiShareFatLight } from "react-icons/pi";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "../../../entities/Post";
import useGetPostCommentCount from "../../../hooks/user/useGetPostCommentCount";
import useGetPostLike from "../../../hooks/user/useGetPostLike";
import useGetPostLikeCount from "../../../hooks/user/useGetPostLikeCount";
import useGetPostLikeUserList from "../../../hooks/user/useGetPostLikeUserList";
import useGetPostShareCount from "../../../hooks/user/useGetPostShareCount";
import useLikePost from "../../../hooks/user/useLikePost";
import useSharePost from "../../../hooks/user/useSharePost";

import SharePostModal from "./SharePostModal";
import UserListModel from "./UserListModel";

interface Props {
  posts: Post;
  onOpen: () => void;
  handleFocusInputClick: () => void;
}

const LikeCommentShareButton = ({
  posts,
  onOpen,
  handleFocusInputClick,
}: Props) => {
  const { data: postLike } = useGetPostLike(posts.postId);
  const { data: postLikeCount } = useGetPostLikeCount(posts.postId);
  const { data: postCommentCount } = useGetPostCommentCount(posts.postId);
  const { data: postShareCount } = useGetPostShareCount(posts.postId);
  const { mutate: likePost } = useLikePost();

  const handleLikePostClick = () => {
    likePost(posts.postId);
  };

  const { colorMode } = useColorMode();
  const isSmallScreen = useBreakpointValue({ base: true, md: false });
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
    isOpen: isOpenLikeList,
    onOpen: onOpenLikeList,
    onClose: onCloseLikeList,
  } = useDisclosure();

  const {
    register,
    loading,
    handleSubmit,
    onSubmit,
    setValue,
    isSuccessful,
    setIsSuccessful,
  } = useSharePost(posts.postId);

  const {
    data: postLikeUserList,
    fetchNextPage,
    hasNextPage,
  } = useGetPostLikeUserList({
    postId: posts.postId,
    pageSize: 10,
  });
  const fetchedPostData =
    postLikeUserList?.pages.reduce(
      (total, page) => total + page.userList.length,
      0
    ) || 0;
  const count = postLikeCount?.postLikeCount ?? 0;
  const likeCount = count - 3;

  return (
    <>
      <Box display="flex" mt="5px" alignItems="center">
        {postLikeCount && postLikeCount.postLikeCount >= 1 && (
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
              {postLike?.liked
                ? postLikeCount.postLikeCount > 1
                  ? `You and ${postLikeCount.postLikeCount - 1} others`
                  : "You"
                : postLikeCount.postLikeCount > 0
                ? `${postLikeCount.postLikeCount} ${
                    postLikeCount.postLikeCount === 1 ? "like" : "likes"
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
            {postLikeUserList?.pages.map((page, pageIndex) =>
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
        {postCommentCount && postCommentCount?.postCommentCount >= 1 && (
          <Box
            display="flex"
            mr="15px"
            alignItems="center"
            onClick={
              postCommentCount.postCommentCount > 1
                ? onOpen
                : handleFocusInputClick
            }
            cursor="pointer"
            userSelect="none"
          >
            <Text mr="3px">{postCommentCount?.postCommentCount}</Text>
            {isSmallScreen ? (
              <FaComment />
            ) : (
              <Text>
                {postCommentCount.postCommentCount > 1 ? "comments" : "comment"}
              </Text>
            )}
          </Box>
        )}
        {postShareCount && postShareCount.sharedPostCount >= 1 && (
          <Box display="flex" alignItems="center">
            <Text mr="3px">{postShareCount?.sharedPostCount}</Text>
            {isSmallScreen ? (
              <PiShareFatLight />
            ) : (
              <Text>
                {postShareCount?.sharedPostCount > 1 ? "shares" : "share"}
              </Text>
            )}
          </Box>
        )}
      </Box>
      <Divider mt="5px" mb="5px" color="gray.500" />
      <Box display="flex" justifyContent="space-around">
        <Box
          {...boxStyles}
          onClick={handleLikePostClick}
          color={postLike?.liked ? "#1877F2" : "white.500"}
        >
          <BiSolidLike size="20px" />
          <Text ml="5px" fontWeight="semibold">
            Like
          </Text>
        </Box>
        <Box {...boxStyles} onClick={handleFocusInputClick}>
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
          <Divider />
          <ModalCloseButton />
          <ModalBody maxHeight="400px" overflowY="auto" id="list">
            <InfiniteScroll
              dataLength={fetchedPostData}
              next={fetchNextPage}
              hasMore={!!hasNextPage}
              loader={<Spinner />}
              scrollableTarget="list"
            >
              {postLikeUserList?.pages.map((page) =>
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

export default LikeCommentShareButton;
