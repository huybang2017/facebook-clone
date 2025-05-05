import { Box, Grid, GridItem, useBreakpointValue } from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router-dom";
import { useAuthQueryStore } from "../../store/auth-store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import Footer from "../../components/admin/AdminFooter";

const AdminLayout = () => {
  const location = useLocation();
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const navigate = useNavigate();

  useEffect(() => {
    if (!jwtToken) {
      navigate("/login");
    }
  }, [jwtToken, navigate]);

  // Responsive sidebar width
  const sidebarWidth = useBreakpointValue({ base: "70px", md: "250px" });

  return (
    <>
      {jwtToken && (
        <>
          <Box
            position="fixed"
            left="0px"
            top="0px"
            zIndex="2000"
            mt="12px"
            width={sidebarWidth}
            height="100vh"
            bg="gray.800"
            color="white"
            boxShadow="md"
          >
            <AdminSidebar />
          </Box>
        </>
      )}

      <Grid
        templateColumns={`${sidebarWidth} 1fr`}
        templateAreas={`"sidebar main"`}
        mt={{ base: "10px", xl: "60px" }}
        minHeight="100vh"
      >
        <GridItem area="sidebar" as="aside">
          <AdminSidebar />
        </GridItem>

        <GridItem area="main" as="main" pl={{ base: "10px", md: "250px" }} pr={{ base: "10px", md: "20px" }}>
          <Box>
            <Outlet />
          </Box>
        </GridItem>
      </Grid>

      {location.pathname === "/admin" && <Footer />}
    </>
  );
};

export default AdminLayout;

