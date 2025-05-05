import { Avatar, Box, Skeleton, Text, useColorMode } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import { IoLogoGameControllerA } from "react-icons/io";
import { IoStorefrontSharp } from "react-icons/io5";
import { MdOndemandVideo } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import pic from "../../../assets/profpic.jpeg";
import { useGameStore } from "../../../store/game-store";
import { useProfileStore } from "../../../store/profile-store";
import { useUserStore } from "../../../store/user-store";

const Sidebar = () => {
  const { colorMode } = useColorMode();
  const { onOpen } = useGameStore();
  const boxStyles = {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    borderRadius: "5px",
    _hover: {
      bg: colorMode === "dark" ? "gray.700" : "gray.200",
    },
  };
  const { firstName, lastName, profilePicture, userId } = useUserStore();
  const { setIsProfile } = useProfileStore();
  const navigate = useNavigate();
  const handleNavigateClick = () => {
    navigate(`/profile/${userId}`);
    setIsProfile(true);
  };

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (userId) {
      setIsLoading(false);
    }
  }, [userId]);

  const array = [1, 2, 3, 4, 5];

  return (
    <>
      {isLoading ? (
        array.map((skeleton) => (
          <Skeleton width="300px" height="40px" mt="10px" key={skeleton} />
        ))
      ) : (
        <Box width="300px">
          <Box {...boxStyles} cursor="pointer" onClick={handleNavigateClick}>
            <Avatar src={profilePicture || pic} height="30px" width="30px" />
            <Text ml="10px" textTransform="capitalize">
              {firstName} {lastName}
            </Text>
          </Box>

          <Link to="/friends">
            <Box {...boxStyles}>
              <FaUserFriends size="30px" />
              <Text ml="10px">Friends</Text>
            </Box>
          </Link>
          <Link to="/watch">
            <Box {...boxStyles}>
              <MdOndemandVideo size="30px" />
              <Text ml="10px">Video</Text>
            </Box>
          </Link>
          <Link to="/marketplace">
            <Box {...boxStyles}>
              <IoStorefrontSharp size="30px" />
              <Text ml="10px">Marketplace</Text>
            </Box>
          </Link>
          <Box {...boxStyles} cursor="pointer" onClick={onOpen}>
            <IoLogoGameControllerA size="30px" />
            <Text ml="10px">Games</Text>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Sidebar;
