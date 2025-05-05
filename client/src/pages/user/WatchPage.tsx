import { AspectRatio, Box, Card, Grid, GridItem, Text } from "@chakra-ui/react";

const WatchPage = () => {
  return (
    <Grid
      templateColumns={{
        base: "1fr",
        lg: "0.2fr 0.6fr 0.2fr",
        xl: "0.3fr 0.5fr 0.3fr",
      }}
      templateAreas={{
        base: `"section"`,
        lg: `"asideLeft section asideRight"`,
        xl: `"asideLeft section asideRight"`,
      }}
      mt={{ base: "50px", md: "35px", lg: "55px", xl: "15px" }}
      padding={{ base: 3, md: 7, lg: 2 }}
    >
      <GridItem area="section">
        <Card alignItems="center" mb="20px" padding={3}>
          <Text fontSize="x-large" fontWeight="semibold" textAlign="center">
            Featured Projects
          </Text>
        </Card>
        <Text fontWeight="semibold">My youtube youngwold huybang2017</Text>
        <AspectRatio ratio={16 / 9}>
          <iframe
            src="https://www.youtube.com"
            title="YouTube video player"
            allowFullScreen
          />
        </AspectRatio>

        {/* <Box mt="20px" mb="50px">
          <Text fontWeight="semibold">Fullstack Responsive Facebook Clone</Text>
          <AspectRatio ratio={16 / 9}>
            <iframe
              src="https://www.youtube.com/embed/pnD32jIq0Us?si=kJ-XUXAy-ZckXWla"
              title="YouTube video player"
              allowFullScreen
            />
          </AspectRatio>
        </Box> */}
      </GridItem>
    </Grid>
  );
};

export default WatchPage;
