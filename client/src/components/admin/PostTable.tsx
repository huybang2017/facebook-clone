import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Center,
  Flex,
  IconButton,
  ButtonGroup,
  Button,
  Tooltip,
} from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useState } from "react";
import useFetchAllPostsAdmin from "../../hooks/admin/useFetchAllPostsAdmin";
import { FaBan } from "react-icons/fa6";

const PostTable = () => {
  const [page, setPage] = useState(0);
  const pageSize = 5;

  const { data, isLoading } = useFetchAllPostsAdmin({ page, pageSize });

  const posts = data?.postWithToxicResponseList
  const totalPages = data?.pageResponse?.totalPages ?? 0;

  const handleChangePage = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  const handleDeletePost = (postId: number) => {
    console.log("Xóa bài viết với ID:", postId);
  };

  const handleEditPost = (postId: number) => {
    console.log("Chỉnh sửa bài viết với ID:", postId);
  };

  return (
    <Box overflowX="auto">
      {isLoading ? (
        <Center py={10}>
          <Spinner size="xl" />
        </Center>
      ) : (
        <>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Tiêu đề</Th>
                <Th>Tác giả</Th>
                <Th>Ngày tạo</Th>
                <Th>đánh giá toxic</Th>
                <Th>Hành động</Th>
              </Tr>
            </Thead>
            <Tbody>
              {posts?.length === 0 ? (
                <Tr>
                  <Td colSpan={5} textAlign="center">
                    Không có bài viết nào.
                  </Td>
                </Tr>
              ) : (
                posts.map((postWrapper: any) => {
                  const post = postWrapper.postModel;
                  const toxic = postWrapper.toxicPostResponse;

                  return (
                    <Tr key={post.postId}>
                      <Td>{post.content}</Td>
                      <Td>{post.firstName} {post.lastName}</Td>
                      <Td>{post.timestamp}</Td>
                      <Td>{toxic?.averageScore?.toFixed(4)}</Td>
                      <Td>
                        <ButtonGroup>
                          <Tooltip label="Ban account" aria-label="Ban account">
                            <IconButton
                              icon={<FaBan />}
                              aria-label="Ban account"
                              colorScheme="red"
                              onClick={() => handleDeletePost(post.postId)}
                            />
                          </Tooltip>
                        </ButtonGroup>
                      </Td>
                    </Tr>
                  );
                })
              )}
            </Tbody>
          </Table>

          <Flex justify="center" mt={6}>
            <ButtonGroup size="sm" variant="outline" spacing={1}>
              <IconButton
                icon={<LuChevronLeft />}
                aria-label="Trang trước"
                isDisabled={page === 0}
                onClick={() => handleChangePage(page - 1)}
              />
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i}
                  onClick={() => handleChangePage(i)}
                  colorScheme={i === page ? "blue" : undefined}
                >
                  {i + 1}
                </Button>
              ))}
              <IconButton
                icon={<LuChevronRight />}
                aria-label="Trang sau"
                isDisabled={page >= totalPages - 1}
                onClick={() => handleChangePage(page + 1)}
              />
            </ButtonGroup>
          </Flex>
        </>
      )
      }
    </Box >
  );
};

export default PostTable;

