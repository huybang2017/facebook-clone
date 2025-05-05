import { Box, Table, Thead, Tbody, Tr, Th, Td, Button, Icon } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const CommentTable = () => {
  const comments = [
    { id: 1, postTitle: "Post 1", author: "Commenter 1", comment: "Nice post!" },
    { id: 2, postTitle: "Post 2", author: "Commenter 2", comment: "I disagree." },
    // Add more comments
  ];

  return (
    <Box overflowX="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Post Title</Th>
            <Th>Commenter</Th>
            <Th>Comment</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {comments.map((comment) => (
            <Tr key={comment.id}>
              <Td>{comment.postTitle}</Td>
              <Td>{comment.author}</Td>
              <Td>{comment.comment}</Td>
              <Td>
                <Link to={`/admin/comments/edit/${comment.id}`}>
                  <Button leftIcon={<Icon as={FaEdit} />} colorScheme="teal" size="sm" mr={2}>
                    Edit
                  </Button>
                </Link>
                <Button leftIcon={<Icon as={FaTrash} />} colorScheme="red" size="sm">
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default CommentTable;
