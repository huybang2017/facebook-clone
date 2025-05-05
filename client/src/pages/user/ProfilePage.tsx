import { Grid, GridItem, Show } from "@chakra-ui/react";
import AllFriends from "../../components/user/FriendsPage/AllFriends";
import FriendSuggestions from "../../components/user/FriendsPage/FriendSuggestions";
import UserProfile from "../../components/user/ProfilePage/UserProfile";
import { useFriendStore } from "../../store/friend-store";
import { useProfileStore } from "../../store/profile-store";
import FriendRequests from "../../components/user/FriendsPage/FriendRequests";

const ProfilePage = () => {
  const { isProfile } = useProfileStore();
  const { isAllFriends, isFriendRequest, isSuggestions } = useFriendStore();
  return (
    <>
      {isProfile ? (
        <UserProfile />
      ) : (
        <Grid
          templateColumns={{
            xl: "0.3fr 1.3fr ",
          }}
          templateAreas={{ base: "'main'", lg: "'asideLeft main '" }}
          as="main"
        >
          <GridItem area="main">
            <UserProfile />
          </GridItem>
          <Show above="xl">
            <GridItem
              area="asideLeft"
              position="fixed"
              width="calc(0.2 * 100vw)"
              as="aside"
            >
              {isAllFriends ? (
                <AllFriends />
              ) : isSuggestions ? (
                <FriendSuggestions />
              ) : isFriendRequest ? (
                <FriendRequests />
              ) : null}
            </GridItem>
          </Show>
        </Grid>
      )}
    </>
  );
};

export default ProfilePage;
