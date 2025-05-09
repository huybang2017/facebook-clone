import OnlyHeader from "@/pages/layouts/OnlyHeader";
import FriendPage from "@/pages/layouts/FriendLayout";
import Home from "../pages/social-media/Home";
import CreatePost from "../pages/social-media/CreatePost";
import Profile from "../pages/social-media/Profile";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import NotFound from "@/pages/exception/NotFound";
import CommingSoon from "@/pages/exception/CommingSoon";
import ListFriends from "@/pages/Friends/ListFriends";
import RequestFriends from "@/pages/Friends/RequestFriends";
import InvitationFriends from "@/pages/Friends/InvitationFriends";

const publicRoute = [
  { path: "/login", element: Login, layout: null },
  { path: "/register", element: Register, layout: null },
];

const privateRoute = [
  { path: "/", element: Home },
  { path: "/create-post", element: CreatePost, layout: OnlyHeader },
  { path: "/profile", element: Profile, layout: OnlyHeader },
  { path: "/friends/list", element: ListFriends, layout: FriendPage },
  { path: "/friends/request", element: RequestFriends, layout: FriendPage },
  {
    path: "/friends/invitation",
    element: InvitationFriends,
    layout: FriendPage,
  },
  { path: "/video", element: CommingSoon, layout: null },
  { path: "/market", element: CommingSoon, layout: null },
  { path: "/game", element: CommingSoon, layout: null },
  { path: "/*", element: NotFound, layout: null },
];

export { privateRoute, publicRoute };
