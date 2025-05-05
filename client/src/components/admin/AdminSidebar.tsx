import { Box, VStack, Link, Text, Icon } from "@chakra-ui/react";
import { FaUser, FaCog, FaTachometerAlt } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <Box
      as="aside"
      width="250px"
      bg="gray.800"
      color="white"
      height="100vh"
      position="fixed"
      top={0}
      left={0}
      boxShadow="md"
      p={4}
    >
      <VStack align="start" spacing={6}>
        <Text fontSize="xl" fontWeight="bold" color="blue.300">
          Admin Panel
        </Text>
        <Link as={RouterLink} to="/admin/post">
          <Box display="flex" alignItems="center" gap={2}>
            <Icon as={FaUser} />
            <Text>Post</Text>
          </Box>
        </Link>
        <Link as={RouterLink} to="/admin/comment">
          <Box display="flex" alignItems="center" gap={2}>
            <Icon as={FaCog} />
            <Text>Comment</Text>
          </Box>
        </Link>
      </VStack>
    </Box>
  );
};

export default AdminSidebar;
