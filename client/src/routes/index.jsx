import OnlyHeader from "@/pages/layouts/OnlyHeader";
import HeaderSidebar from "@/pages/layouts/HeaderSidebar";
import FriendPage from "@/pages/layouts/FriendLayout";
import Home from "../pages/social-media/Home";
import CreatePost from "../pages/social-media/CreatePost";
import Profile from "../pages/social-media/Profile";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import NotFound from "@/pages/exception/NotFound";
import CommingSoon from "@/pages/exception/CommingSoon";
import Friends from "@/pages/Friends/Friends";
import SentRequests from "@/pages/Friends/SentRequests";
import ReceivedRequests from "@/pages/Friends/ReceivedRequests";

const publicRoute = [
  { path: "/login", element: Login, layout: null },
  { path: "/register", element: Register, layout: null },
];

const privateRoute = [
  { path: "/", element: Home },
  { path: "/create-post", element: CreatePost, layout: OnlyHeader },
  { path: "/profile", element: Profile, layout: OnlyHeader },
  { path: "/friends", element: Friends, layout: FriendPage },
  { path: "/friends/requests/sent", element: SentRequests, layout: FriendPage },
  {
    path: "/friends/requests/received",
    element: ReceivedRequests,
    layout: FriendPage,
  },
  { path: "/video", element: CommingSoon, layout: null },
  { path: "/market", element: CommingSoon, layout: null },
  { path: "/game", element: CommingSoon, layout: null },
  { path: "/*", element: NotFound, layout: null },
];

export { privateRoute, publicRoute };
