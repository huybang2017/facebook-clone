import OnlyHeader from "@/pages/layouts/OnlyHeader";
import HeaderSidebar from "@/pages/layouts/HeaderSidebar";
import FriendPage from "@/pages/layouts/FriendLayout";
import Home from "../pages/social-media/Home";
import CreatePost from "../pages/social-media/CreatePost";
import {
  Friends,
  FriendRequest,
  FriendInvitation,
} from "../pages/social-media/Friends";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import NotFound from "@/pages/exception/NotFound";
import CommingSoon from "@/pages/exception/CommingSoon";
import HeaderSidebar from "@/pages/layouts/HeaderSidebar";
import FriendPage from "@/pages/layouts/FriendPage";
import ProfilePage from "@/pages/layouts/ProfilePage";
import PostProfile from "@/pages/Profiles/PostProfile";
import ImageProfile from "@/pages/Profiles/ImageProfile";
import FriendProfile from "@/pages/Profiles/FriendProfile";

const publicRoute = [
  { path: "/login", element: Login, layout: null },
  { path: "/register", element: Register, layout: null },
];

const privateRoute = [
  { path: "/", element: Home },
  { path: "/create-post", element: CreatePost, layout: OnlyHeader },
  { path: "/profile", element: Profile, layout: OnlyHeader },
  { path: "/friends", element: Friends, layout: FriendPage },
  { path: "friend-request", element: FriendRequest, layout: FriendPage },
  { path: "friend-invitation", element: FriendInvitation, layout: FriendPage },
  { path: "/video", element: CommingSoon, layout: null },
  { path: "/market", element: CommingSoon, layout: null },
  { path: "/game", element: CommingSoon, layout: null },
  { path: "/*", element: NotFound, layout: null },
];

export { privateRoute, publicRoute };
