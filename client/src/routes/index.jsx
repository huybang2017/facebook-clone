import Home from "../pages/social-media/Home";
import CreatePost from "../pages/social-media/CreatePost";
import Profile from "../pages/social-media/Profile";
import Friends from "../pages/social-media/Friends";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import OnlyHeader from "@/pages/layouts/OnlyHeader";
import NotFound from "@/pages/exception/NotFound";
import CommingSoon from "@/pages/exception/CommingSoon";
import HeaderSidebar from "@/pages/layouts/HeaderSidebar";
const privateRoute = [
  { path: "/", element: Home },
  { path: "/create-post", element: CreatePost, layout: OnlyHeader },
  { path: "/profile", element: Profile, layout: OnlyHeader },
  { path: "/friends", element: Friends, layout: HeaderSidebar },
  { path: "/login", element: Login, layout: null },
  { path: "/register", element: Register, layout: null },
  { path: "/video", element: CommingSoon, layout: null },
  { path: "/market", element: CommingSoon, layout: null },
  { path: "/game", element: CommingSoon, layout: null },
  { path: "/*", element: NotFound, layout: null },
];

export { privateRoute };
