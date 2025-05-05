import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  GridItem,
  Show,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import { FaFacebook, FaHome, FaUserFriends } from "react-icons/fa";
import { IoLogoGameControllerA } from "react-icons/io";
import { IoStorefrontSharp } from "react-icons/io5";
import { MdOndemandVideo } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { useGameStore } from "../../../store/game-store";
import GameModal from "./GameModal";
import Search from "./Search";

const Navbar = () => {
  const location = useLocation();
  const { colorMode } = useColorMode();
  const isSmallScreen = useBreakpointValue({ base: true, md: false });
  const { onOpen } = useGameStore();

  const buttonStyle = {
    bg: "transparent",
    width: "100%",
    _hover: {
      bg: colorMode === "dark" ? "#303030" : "gray.100",
    },
  };

  return (
    <>
      <Card
        borderRadius="none"
        position="fixed"
        top="0"
        width="100%"
        zIndex={100}
        as="header"
        padding={2}
      >
        <Grid
          templateColumns="0.5fr 0.5fr 0.5fr"
          templateAreas={`"asideLeft content1 asideRight"`}
          alignItems="center"
          mt="5px"
        >
          <GridItem
            area="asideLeft"
            display="flex"
            justifyContent="start"
            ml="10px"
            alignItems="center"
            position={isSmallScreen ? undefined : "relative"}
          >
            <Link to="/home">
              <Box
                color="#1877F2"
                cursor="pointer"
                mr={{ base: "5px", md: "10px" }}
              >
                <FaFacebook size="35px" />
              </Box>
            </Link>
            <Search />
          </GridItem>

          {isSmallScreen && (
            <GridItem area="content1">
              <Box w="35px"></Box>
            </GridItem>
          )}
          <Show above="md">
            <GridItem area="content1">
              <Flex justifyContent="space-around" alignItems="center">
                <Link to="/home" style={{ flex: 1 }}>
                  <Button
                    color={
                      location.pathname === "/home" ? "#1877F2" : "white.500"
                    }
                    {...buttonStyle}
                  >
                    <FaHome size="30px" />
                  </Button>
                </Link>
                <Link to="/friends" style={{ flex: 1 }}>
                  <Button
                    color={
                      location.pathname.startsWith("/friends")
                        ? "#1877F2"
                        : "white.500"
                    }
                    {...buttonStyle}
                  >
                    <FaUserFriends size="30px" />
                  </Button>
                </Link>
                <Link to="/watch" style={{ flex: 1 }}>
                  <Button
                    color={
                      location.pathname === "/watch" ? "#1877F2" : "white.500"
                    }
                    {...buttonStyle}
                  >
                    <MdOndemandVideo size="30px" />
                  </Button>
                </Link>
                <Link to="/marketplace" style={{ flex: 1 }}>
                  <Button
                    color={
                      location.pathname.startsWith("/marketplace")
                        ? "#1877F2"
                        : "white.500"
                    }
                    {...buttonStyle}
                  >
                    <IoStorefrontSharp size="25px" />
                  </Button>
                </Link>
                <Box style={{ flex: 1 }}>
                  <Button {...buttonStyle} onClick={onOpen}>
                    <IoLogoGameControllerA size="35px" />
                  </Button>
                </Box>
              </Flex>
              <GameModal />
            </GridItem>
          </Show>
          <GridItem area="asideRight" />
        </Grid>
      </Card>
    </>
  );
};

export default Navbar;
