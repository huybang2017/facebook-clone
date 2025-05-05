import {
  Box,
  Card,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import useSearchUser from "../../../hooks/user/useSearchUser";
import UserSuggestion from "./UserSuggestion";

const Search = () => {
  const isSmallScreen = useBreakpointValue({ base: true, md: false });
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const focusRef = useRef<HTMLInputElement>(null);
  const [keyword, setKeyword] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showInput, setShowInput] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setKeyword(text);
    setShowSuggestions(true);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (keyword) {
      navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
      setShowSuggestions(false);
    }
  };

  const { data: searchUser } = useSearchUser({
    keyword: keyword,
    pageSize: 5,
  });

  const handleShowInputClick = () => {
    setShowInput(false);
    setKeyword("");
  };

  useEffect(() => {
    if (focusRef.current && showInput) {
      focusRef.current.focus();
    }
  }, [showInput]);

  const handleNavigateClick = (userId: number) => {
    navigate(`/profile/${userId}`);
    setShowSuggestions(false);
    setShowInput(false);
    setKeyword("");
  };

  return (
    <>
      {isSmallScreen ? (
        <IconButton
          aria-label="Search"
          icon={<BsSearch />}
          type="submit"
          bg="transparent"
          _hover={{ bg: "transparent" }}
          border="1px solid"
          borderRadius="20px"
          size="sm"
          onClick={() => setShowInput(!showInput)}
        />
      ) : (
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <InputGroup
            justifyContent={{ base: "center", md: "flex-start" }}
            onClick={() => setShowInput(true)}
          >
            <Input
              borderRadius={20}
              placeholder="Search Facebook"
              variant="filled"
              textAlign={{ base: "center", md: "left" }}
              fontSize={{ base: "sm", lg: "lg" }}
              w={{ base: "100%", md: "90%", lg: "80%", xl: "50%" }}
              onChange={handleInputChange}
              border="none"
              _focus={{ border: "none", boxShadow: "none" }}
              _hover={{ border: "none" }}
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
      )}
      {showInput && (
        <Card
          position="absolute"
          // top="60px"
          top={{ base: "55px", md: "0" }}
          left="0"
          right="0"
          borderRadius="none"
          boxShadow="none"
          p={isSmallScreen ? 3 : 0}
          zIndex={100}
        >
          <Box display="flex" alignItems="center">
            <IconButton
              aria-label="close"
              icon={<FaArrowLeft size="20px" />}
              bg={colorMode === "dark" ? "gray.700" : "white.500"}
              _hover={{
                bg: colorMode === "dark" ? "#303030" : "gray.100",
              }}
              isRound
              size="md"
              onClick={handleShowInputClick}
              mr="10px"
            />

            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <Box w={{ base: "100%", md: "90%", lg: "80%", xl: "50%" }}>
                <InputGroup>
                  <Input
                    ref={focusRef}
                    borderRadius={20}
                    value={keyword}
                    placeholder="Search Facebook"
                    variant="filled"
                    fontSize={{ base: "sm", md: "md" }}
                    onChange={handleInputChange}
                    border="none"
                    _hover={{ border: "none" }}
                    _focus={{
                      boxShadow: "none",
                      border: "none",
                      bg: colorMode === "dark" ? "#303030" : "gray.100",
                    }}
                  />
                  <InputRightElement>
                    <IconButton
                      aria-label="Search"
                      icon={<BsSearch />}
                      type="submit"
                      bg="transparent"
                      _hover={{ bg: "transparent" }}
                    />
                  </InputRightElement>
                </InputGroup>
              </Box>
            </form>
          </Box>
        </Card>
      )}
      {keyword && showSuggestions && (
        <Card
          position="absolute"
          top={{ base: "62px", md: "48px" }}
          left={{ base: "0", md: "-18px" }}
          borderRadius="none"
          w={{ base: "100%", md: "100%", lg: "90%", xl: "60%" }}
          boxShadow="none"
        >
          {searchUser?.pages.flatMap((page) =>
            page.userList.map((user) => (
              <Box
                key={user.uniqueId}
                onClick={() => handleNavigateClick(user.userId)}
              >
                <UserSuggestion user={user} />
              </Box>
            ))
          )}
        </Card>
      )}
    </>
  );
};

export default Search;
