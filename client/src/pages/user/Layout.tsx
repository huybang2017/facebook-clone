import { Box, Grid, GridItem } from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../../components/user/Footer/Footer";
import CreateStoryModal from "../../components/user/HomePage/CreateStoryModal";
import Navbar from "../../components/user/Navbar/Navbar";
import NavbarRight from "../../components/user/Navbar/NavbarRight";
import EditProfileModal from "../../components/user/ProfilePage/EditProfileModal";
import UploadUserImageModal from "../../components/user/ProfilePage/UploadUserImageModal";
import { useAuthQueryStore } from "../../store/auth-store";

const Layout = () => {
  const location = useLocation();
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;

  return (
    <>
      {jwtToken && (
        <>
          <Navbar />
          <Box position="fixed" right="0px" top="0px" zIndex="2000" mt="12px">
            <NavbarRight />
          </Box>
        </>
      )}
      <Grid
        templateColumns="1fr"
        templateAreas={`"main"`}
        mt={{ base: "10px", xl: "60px" }}
      >
        <GridItem area="main" as="main">
          <Box>
            <Outlet />
          </Box>
          <CreateStoryModal />
          <EditProfileModal />
          <UploadUserImageModal />
        </GridItem>
      </Grid>
      {location.pathname === "/" ? <Footer /> : ""}
    </>
  );
};

export default Layout;
