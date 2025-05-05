import { Avatar, Box, Image, Text, useColorMode } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import pic from "../../../assets/profpic.jpeg";
import { PostComment } from "../../../entities/PostComment";
import { useProfileStore } from "../../../store/profile-store";
interface Props {
  comments: PostComment;
}

const Comments = ({ comments }: Props) => {
  const time = new Date(comments.timestamp);
  const { colorMode } = useColorMode();
  const textStyles = {
    fontSize: "sm",
    cursor: "pointer",
    _hover: { textDecoration: "underline" },
  };

  const { setIsProfile } = useProfileStore();

  const navigate = useNavigate();
  const handleNavigateClick = () => {
    navigate(`/profile/${comments.userId}`);
    setIsProfile(true);
  };
  // const commentBottom = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (commentBottom.current) {
  //     commentBottom.current.scrollIntoView();
  //   }
  // }, [comments.comment, comments.commentImage]);

  return (
    <>
      <Box mt="10px">
        <Box display="flex">
          <Avatar
            src={comments.profilePicture || pic}
            size="sm"
            mr="5px"
            onClick={handleNavigateClick}
            cursor="pointer"
          />
          <Box
            bg={
              comments.comment
                ? colorMode === "dark"
                  ? "gray.600"
                  : "gray.100"
                : undefined
            }
            borderRadius="20px"
            padding={comments.comment ? "6px 12px 6px 12px" : "4px"}
          >
            <Text
              fontSize="sm"
              fontWeight="semibold"
              textTransform="capitalize"
              onClick={handleNavigateClick}
              cursor="pointer"
            >
              {comments.firstName} {comments.lastName}
            </Text>
            <Text>{comments.comment}</Text>
          </Box>
        </Box>
        {comments.commentImage && (
          <Box ml="40px" mt="5px" mb="5px">
            <Image
              src={comments.commentImage}
              objectFit="cover"
              width="50%"
              height="auto"
              borderRadius="10px"
            />
          </Box>
        )}
        <Box display="flex" ml="50px">
          <Text mr="20px" {...textStyles}>
            <ReactTimeAgo date={time} locale="en-US" />
          </Text>
          {/* <Text mr="20px" {...textStyles}>
            Like
          </Text>
          <Text {...textStyles}>Reply</Text> */}
        </Box>
      </Box>
      {/* <Box ref={commentBottom}></Box> */}
    </>
  );
};

export default Comments;
