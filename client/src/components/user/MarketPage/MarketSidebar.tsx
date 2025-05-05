import {
  Box,
  Button,
  Card,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { FaCar, FaGuitar, FaList } from "react-icons/fa6";
import { FiPaperclip, FiPlus } from "react-icons/fi";
import { ImMobile2, ImVideoCamera } from "react-icons/im";
import {
  IoGameController,
  IoShirtSharp,
  IoStorefrontSharp,
} from "react-icons/io5";
import {
  MdOutlineSportsSoccer,
  MdRealEstateAgent,
  MdSell,
} from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

const MarketSidebar = () => {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const location = useLocation();
  const isSmallScreen = useBreakpointValue(
    { base: true, lg: false },
    { fallback: "lg" }
  );

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

  const textStyles = {
    ml: "10px",
    fontSize: "lg",
    fontWeight: "semibold",
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

  const handleNavigateClick = () => {
    navigate("/marketplace/create");
  };

  const handleNavigateCategoryClick = (category: string) => {
    navigate(`/marketplace/category/${category}`);
  };

  const handleNavigateMarketplaceClick = () => {
    navigate("/marketplace");
  };

  const handleNavigateMyProductsClick = () => {
    navigate("/marketplace/user/item");
  };

  const [keyword, setKeyword] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setKeyword(text);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (keyword) {
      navigate(`/marketplace/search?keyword=${encodeURIComponent(keyword)}`);
    }
  };

  return (
    <>
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
            ml={{ base: "0", lg: "10px" }}
          >
            Marketplace
          </Text>
          <form onSubmit={handleSubmit}>
            <InputGroup justifyContent={{ base: "center", md: "flex-start" }}>
              <Input
                borderRadius={20}
                placeholder="Search Marketplace"
                variant="filled"
                fontSize={{ base: "sm", md: "md" }}
                border="none"
                _hover={{ border: "none" }}
                _focus={{
                  boxShadow: "none",
                  border: "none",
                  bg: colorMode === "dark" ? "#303030" : "gray.100",
                }}
                onChange={handleInputChange}
              />
              <InputLeftElement>
                <IconButton
                  aria-label="Search"
                  icon={<BsSearch />}
                  type="submit"
                  bg="transparent"
                  _hover={{ bg: "transparent" }}
                />
              </InputLeftElement>
            </InputGroup>
          </form>
          <Flex
            flexDirection={{ base: "row", lg: "column" }}
            alignItems={{ base: "center", lg: "initial" }}
            justifyContent={{ base: "space-between", lg: "initial" }}
          >
            <Box
              {...boxStyles}
              mt="10px"
              bg={
                location.pathname === "/marketplace"
                  ? colorMode === "dark"
                    ? "#303030"
                    : "gray.100"
                  : undefined
              }
              onClick={handleNavigateMarketplaceClick}
            >
              <IconButton
                aria-label="all"
                icon={<IoStorefrontSharp size="20px" />}
                bg={"#1877F2"}
                _hover={{
                  bg: "#165BB7",
                }}
                isRound
                size="md"
              />
              <Text {...textStyles}>Browse all</Text>
            </Box>
            <Box
              {...boxStyles}
              mt={{ base: "10px", lg: "0" }}
              bg={
                location.pathname === "/marketplace/user/item"
                  ? colorMode === "dark"
                    ? "#303030"
                    : "gray.100"
                  : undefined
              }
              onClick={handleNavigateMyProductsClick}
            >
              <IconButton
                aria-label="all"
                icon={<MdSell size="20px" />}
                isRound
                size="md"
              />
              <Text {...textStyles}>Selling</Text>
            </Box>
          </Flex>
          <Button
            width="100%"
            mt="10px"
            bg={"#1877F2"}
            _hover={{
              bg: "#165BB7",
            }}
            onClick={handleNavigateClick}
          >
            <FiPlus size="20px" /> <Text ml="10px">Create new listing</Text>
          </Button>
          {isSmallScreen ? (
            <Box mt="10px">
              <Menu>
                <MenuButton as={Button} borderRadius="20" leftIcon={<FaList />}>
                  <Text ml="5px">Categories</Text>
                </MenuButton>
                <MenuList>
                  <MenuItem
                    onClick={() => handleNavigateCategoryClick("vehicles")}
                  >
                    <Card {...cardStyles}>
                      <FaCar size="20px" />
                    </Card>
                    <Text>Vehicles</Text>
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleNavigateCategoryClick("electronics")}
                  >
                    <Card {...cardStyles}>
                      <ImMobile2 size="20px" />
                    </Card>
                    <Text>Electronics</Text>
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleNavigateCategoryClick("apparel")}
                  >
                    <Card {...cardStyles}>
                      <IoShirtSharp size="20px" />
                    </Card>
                    <Text>Apparel</Text>
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      handleNavigateCategoryClick("toys_and_games")
                    }
                  >
                    <Card {...cardStyles}>
                      <IoGameController size="20px" />
                    </Card>
                    <Text>Toys & Games</Text>
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleNavigateCategoryClick("home_sales")}
                  >
                    <Card {...cardStyles}>
                      <MdRealEstateAgent size="20px" />
                    </Card>
                    <Text>Home Sales</Text>
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleNavigateCategoryClick("entertainment")}
                  >
                    <Card {...cardStyles}>
                      <ImVideoCamera size="20px" />
                    </Card>
                    <Text>Entertainment</Text>
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleNavigateCategoryClick("sports")}
                  >
                    <Card {...cardStyles}>
                      <MdOutlineSportsSoccer size="20px" />
                    </Card>
                    <Text>Sports</Text>
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      handleNavigateCategoryClick("office_supplies")
                    }
                  >
                    <Card {...cardStyles}>
                      <FiPaperclip size="20px" />
                    </Card>
                    <Text>Office Supplies</Text>
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      handleNavigateCategoryClick("musical_instruments")
                    }
                  >
                    <Card {...cardStyles}>
                      <FaGuitar size="20px" />
                    </Card>
                    <Text>Musical Instruments</Text>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          ) : (
            <>
              <Text
                ml="10px"
                fontSize="lg"
                fontWeight="semibold"
                mt="10px"
                mb="10px"
              >
                Categories
              </Text>
              <Box
                {...boxStyles}
                onClick={() => handleNavigateCategoryClick("vehicles")}
                bg={
                  location.pathname === `/marketplace/category/vehicles`
                    ? colorMode === "dark"
                      ? "#303030"
                      : "gray.100"
                    : undefined
                }
              >
                <IconButton
                  aria-label="vehicles"
                  icon={<FaCar size="20px" />}
                  isRound
                  size="md"
                />
                <Text {...textStyles}>Vehicles</Text>
              </Box>
              <Box
                {...boxStyles}
                onClick={() => handleNavigateCategoryClick("electronics")}
                bg={
                  location.pathname === `/marketplace/category/electronics`
                    ? colorMode === "dark"
                      ? "#303030"
                      : "gray.100"
                    : undefined
                }
              >
                <IconButton
                  aria-label="electronics"
                  icon={<ImMobile2 size="20px" />}
                  isRound
                  size="md"
                />
                <Text {...textStyles}>Electronics</Text>
              </Box>
              <Box
                {...boxStyles}
                onClick={() => handleNavigateCategoryClick("apparel")}
                bg={
                  location.pathname === `/marketplace/category/apparel`
                    ? colorMode === "dark"
                      ? "#303030"
                      : "gray.100"
                    : undefined
                }
              >
                <IconButton
                  aria-label="apparel"
                  icon={<IoShirtSharp size="20px" />}
                  isRound
                  size="md"
                />
                <Text {...textStyles}>Apparel</Text>
              </Box>
              <Box
                {...boxStyles}
                onClick={() => handleNavigateCategoryClick("toys_and_games")}
                bg={
                  location.pathname === `/marketplace/category/toys_and_games`
                    ? colorMode === "dark"
                      ? "#303030"
                      : "gray.100"
                    : undefined
                }
              >
                <IconButton
                  aria-label="games"
                  icon={<IoGameController size="20px" />}
                  isRound
                  size="md"
                />
                <Text {...textStyles}>Toys & Games</Text>
              </Box>
              <Box
                {...boxStyles}
                onClick={() => handleNavigateCategoryClick("home_sales")}
                bg={
                  location.pathname === `/marketplace/category/home_sales`
                    ? colorMode === "dark"
                      ? "#303030"
                      : "gray.100"
                    : undefined
                }
              >
                <IconButton
                  aria-label="home"
                  icon={<MdRealEstateAgent size="20px" />}
                  isRound
                  size="md"
                />
                <Text {...textStyles}>Home Sales</Text>
              </Box>
              <Box
                {...boxStyles}
                onClick={() => handleNavigateCategoryClick("entertainment")}
                bg={
                  location.pathname === `/marketplace/category/entertainment`
                    ? colorMode === "dark"
                      ? "#303030"
                      : "gray.100"
                    : undefined
                }
              >
                <IconButton
                  aria-label="entertainment"
                  icon={<ImVideoCamera size="20px" />}
                  isRound
                  size="md"
                />
                <Text {...textStyles}>Entertainment</Text>
              </Box>
              <Box
                {...boxStyles}
                onClick={() => handleNavigateCategoryClick("sports")}
                bg={
                  location.pathname === `/marketplace/category/sports`
                    ? colorMode === "dark"
                      ? "#303030"
                      : "gray.100"
                    : undefined
                }
              >
                <IconButton
                  aria-label="sports"
                  icon={<MdOutlineSportsSoccer size="20px" />}
                  isRound
                  size="md"
                />
                <Text {...textStyles}>Sports</Text>
              </Box>
              <Box
                {...boxStyles}
                onClick={() => handleNavigateCategoryClick("office_supplies")}
                bg={
                  location.pathname === `/marketplace/category/office_supplies`
                    ? colorMode === "dark"
                      ? "#303030"
                      : "gray.100"
                    : undefined
                }
              >
                <IconButton
                  aria-label="supply"
                  icon={<FiPaperclip size="20px" />}
                  isRound
                  size="md"
                />
                <Text {...textStyles}>Office Supplies</Text>
              </Box>
              <Box
                {...boxStyles}
                onClick={() =>
                  handleNavigateCategoryClick("musical_instruments")
                }
                bg={
                  location.pathname ===
                  `/marketplace/category/musical_instruments`
                    ? colorMode === "dark"
                      ? "#303030"
                      : "gray.100"
                    : undefined
                }
              >
                <IconButton
                  aria-label="instruments"
                  icon={<FaGuitar size="20px" />}
                  isRound
                  size="md"
                />
                <Text {...textStyles}>Musical Instruments</Text>
              </Box>
            </>
          )}
        </Box>
      </Card>
    </>
  );
};

export default MarketSidebar;
