import { Box, Text, Link, VStack } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box as="footer" bg="gray.800" color="white" p={4} mt={8}>
      <VStack spacing={2} align="center">
        <Text fontSize="sm">
          © {new Date().getFullYear()} Your Admin Panel. All rights reserved.
        </Text>
        <Link href="/privacy-policy" fontSize="sm" color="blue.300">
          Privacy Policy
        </Link>
        <Link href="/terms-of-service" fontSize="sm" color="blue.300">
          Terms of Service
        </Link>
      </VStack>
    </Box>
  );
};

export default Footer;
