import { Box, Button, Center, Heading, Text } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { useAuthQueryStore } from "../../store/auth-store";

const Unauthorized = () => {
  const navigate = useNavigate();
  const { authStore } = useAuthQueryStore();
  const role = authStore.role;

  const handleNavigateClick = () => {
    if (role === "USER") {
      navigate("/home");
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <Center mt="100px">
        <Box display="flex" flexDirection="column">
          <Heading>Oops...</Heading>
          <Text>
            You are not authorized to access this resource. Please provide valid
            authentication credentials.
          </Text>
          <Center>
            <Button
              textAlign="center"
              mt="20px"
              onClick={handleNavigateClick}
              width="120px"
              bg="orange.500"
              _hover={{ bg: "orange.600" }}
            >
              Return
            </Button>
          </Center>
        </Box>
      </Center>
    </>
  );
};

export default Unauthorized;
