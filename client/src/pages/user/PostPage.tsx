import { Grid, GridItem } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import Posts from "../../components/user/Post/Posts";
import useGetPostById from "../../hooks/user/useGetPostById";
import ErrorPage from "./ErrorPage";

const PostPage = () => {
  const params = useParams<{ postId: string }>();
  const postId = Number(params.postId);

  if (
    typeof postId !== "number" ||
    isNaN(postId) ||
    typeof postId === "string"
  ) {
    return <ErrorPage />;
  }

  const { data: getPost } = useGetPostById(postId);

  return (
    <>
      <Grid
        templateColumns={{
          base: "1fr",
          md: "0.1fr 0.8fr 0.1fr",
          lg: "0.2fr 0.6fr 0.2fr",
          xl: "0.4fr 0.5fr 0.4fr",
        }}
        templateAreas={{
          base: `"section"`,
          md: `"asideLeft section asideRight"`,
          lg: `"asideLeft section asideRight"`,
          xl: `"asideLeft section asideRight"`,
        }}
        mt={{ base: "55px", md: "35px", lg: "55px", xl: "5px" }}
        padding={{ base: 2, md: 7, lg: 2 }}
        as="main"
      >
        <GridItem area="section" as="section">
          {getPost && <Posts posts={getPost} />}
        </GridItem>
      </Grid>
    </>
  );
};

export default PostPage;
