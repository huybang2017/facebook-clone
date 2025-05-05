import { Grid, GridItem, useBreakpointValue } from "@chakra-ui/react";

import { Outlet, useLocation } from "react-router-dom";
import AllFriends from "../../components/user/FriendsPage/AllFriends";
import FriendsPageSideBar from "../../components/user/FriendsPage/FriendsPageSidebar";
import PeopleYouMayKnow from "../../components/user/FriendsPage/PeopleYouMayKnow";
import FriendSuggestions from "../../components/user/FriendsPage/FriendSuggestions";
import FriendRequests from "../../components/user/FriendsPage/FriendRequests";

const FriendsPage = () => {
  const location = useLocation();
  const isSmallScreen = useBreakpointValue({ base: true, lg: false });
  return (
    <>
      <Grid
        templateColumns={{ base: "1fr", lg: "0.25fr 1fr" }}
        templateAreas={{
          base: `
          "section1"
          "section2"
          `,
          lg: `
         " section1 section2 "
          `,
        }}
      >
        <GridItem area="section1" zIndex="1">
          {location.pathname === "/friends" && <FriendsPageSideBar />}
          {location.pathname === "/friends/list" && <AllFriends />}
          {location.pathname === "/friends/suggestions" && (
            <FriendSuggestions />
          )}
          {location.pathname === "/friends/requests" && <FriendRequests />}
        </GridItem>
        <GridItem area="section2" mt={{ lg: "40px", xl: "0" }}>
          {location.pathname === "/friends" ? (
            <PeopleYouMayKnow />
          ) : !isSmallScreen ? (
            <Outlet />
          ) : null}
        </GridItem>
      </Grid>
    </>
  );
};

export default FriendsPage;
