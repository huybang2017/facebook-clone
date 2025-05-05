import {
  Box,
  Button,
  Card,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import { FaChevronRight, FaUserFriends, FaUserPlus } from "react-icons/fa";
import { FaList, FaUsers } from "react-icons/fa6";
import { RiUserSearchFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useFriendStore } from "../../../store/friend-store";

const FriendsPageSideBar = () => {
  const { colorMode } = useColorMode();

  const isSmallScreen = useBreakpointValue(
    { base: true, lg: false },
    { fallback: "lg" }
  );

  const { setIsAllFriends, setIsSuggestions, setIsFriendsRequest } =
    useFriendStore();
  const navigate = useNavigate();
  const handleNavigateFriendRequestClick = () => {
    navigate("/friends/requests");
    setIsFriendsRequest(true);
    setIsSuggestions(false);
    setIsAllFriends(false);
  };

  const handleNavigateSuggestionsClick = () => {
    navigate("/friends/suggestions");
    setIsSuggestions(true);
    setIsFriendsRequest(false);
    setIsAllFriends(false);
  };

  const handleNavigateAllFriendsClick = () => {
    navigate("/friends/list");
    setIsAllFriends(true);
    setIsSuggestions(false);
    setIsFriendsRequest(false);
  };

  const boxStyles = {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    borderRadius: "5px",
    _hover: {
      bg: colorMode === "dark" ? "#303030" : "gray.100",
    },
    cursor: "pointer",
  };

  const cardStyles = {
    height: "40px",
    width: "40px",
    bg: colorMode === "dark" ? "#303030" : "gray.100",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "20px",
    mr: "10px",
    _hover: {
      bg: colorMode === "dark" ? "#383838" : "gray.200",
    },
  };

  return (
    <Card
      borderRadius="none"
      height="100%"
      minHeight={{ base: "0", lg: "100vh" }}
    >
      <Box padding={3} position="sticky" top="60px">
        <Text
          fontSize="2xl"
          fontWeight="bold"
          mb="10px"
          mt={{ base: "50px", lg: "0" }}
        >
          Friends
        </Text>

        {isSmallScreen ? (
          <>
            <Box mt="10px" zIndex={3000}>
              <Menu>
                <MenuButton as={Button} borderRadius="20" leftIcon={<FaList />}>
                  <Text ml="5px">Categories</Text>
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={handleNavigateFriendRequestClick}>
                    <Card {...cardStyles}>
                      <FaUserPlus size="20px" />
                    </Card>
                    <Text ml="10px">Friend Request</Text>
                  </MenuItem>
                  <MenuItem onClick={handleNavigateSuggestionsClick}>
                    <Card {...cardStyles}>
                      <RiUserSearchFill size="20px" />
                    </Card>
                    <Text ml="10px">Suggestions</Text>
                  </MenuItem>
                  <MenuItem onClick={handleNavigateAllFriendsClick}>
                    <Card {...cardStyles}>
                      <FaUsers size="20px" />
                    </Card>
                    <Text ml="10px"> All friends</Text>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </>
        ) : (
          <>
            <Link to="/friends">
              <Box
                {...boxStyles}
                bg={colorMode === "dark" ? "#303030" : "gray.100"}
              >
                <IconButton
                  aria-label="all"
                  icon={<FaUserFriends size="20px" />}
                  bg={"#1877F2"}
                  _hover={{
                    bg: "#165BB7",
                  }}
                  isRound
                  size="md"
                />
                <Text
                  ml="10px"
                  fontSize="xl"
                  fontWeight="semibold"
                  whiteSpace="nowrap"
                >
                  Home
                </Text>
              </Box>
            </Link>
            <Box {...boxStyles} onClick={handleNavigateFriendRequestClick}>
              <IconButton
                aria-label="request"
                icon={<FaUserPlus size="20px" />}
                isRound
                size="md"
              />
              <Text
                ml="10px"
                fontSize="xl"
                fontWeight="semibold"
                whiteSpace="nowrap"
                mr="10px"
              >
                Friend Request
              </Text>
              <Spacer />
              <FaChevronRight size="20px" />
            </Box>

            <Box {...boxStyles} onClick={handleNavigateSuggestionsClick}>
              <IconButton
                aria-label="suggestion"
                icon={<RiUserSearchFill size="20px" />}
                isRound
                size="md"
              />
              <Text ml="10px" fontSize="xl" fontWeight="semibold" mr="10px">
                Suggestions
              </Text>
              <Spacer />
              <FaChevronRight size="20px" />
            </Box>

            <Box {...boxStyles} onClick={handleNavigateAllFriendsClick}>
              <IconButton
                aria-label="friends"
                icon={<FaUsers size="20px" />}
                isRound
                size="md"
              />
              <Text ml="10px" fontSize="xl" fontWeight="semibold" mr="10px">
                All friends
              </Text>
              <Spacer />
              <FaChevronRight size="20px" />
            </Box>
          </>
        )}
      </Box>
    </Card>
  );
};

export default FriendsPageSideBar;
