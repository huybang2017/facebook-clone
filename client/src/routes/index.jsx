import OnlyHeader from "@/pages/layouts/OnlyHeader";
import FriendPage from "@/pages/layouts/FriendLayout";
import Home from "../pages/social-media/Home";
import CreatePost from "../pages/social-media/CreatePost";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import NotFound from "@/pages/exception/NotFound";
import CommingSoon from "@/pages/exception/CommingSoon";
import Friends from "@/pages/Friends/Friends";
import SentRequests from "@/pages/Friends/SentRequests";
import ReceivedRequests from "@/pages/Friends/ReceivedRequests";
import ProfilePage from "@/pages/layouts/ProfilePage";
import PostProfile from "@/pages/Profiles/PostProfile";
import ImageProfile from "@/pages/Profiles/ImageProfile";
import FriendProfile from "@/pages/Profiles/FriendProfile";
import VideoCallPage from "@/pages/VideoCall/VideoCallPage";
import PostTable from "@/components/admin/PostTable";
import Footer from "@/components/admin/AdminFooter";
import LayoutPost from "@/pages/admin/LayoutPost";
import LayoutAdmin from "@/pages/admin/LayoutAdmin";
import UserTable from "@/components/admin/UserTable";
import LayoutUser from "@/pages/admin/LayoutUser";

const publicRoute = [
  { path: "/login", element: Login, layout: null },
  { path: "/register", element: Register, layout: null },
];
const privateRoute = [
  { path: "/", element: Home },
  { path: "/create-post", element: CreatePost, layout: OnlyHeader },
  { path: "/profile", element: ProfilePage, layout: OnlyHeader },
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
  { path: "/user/profile/:id", element: PostProfile, layout: ProfilePage },
  { path: "/profile-photos/:id", element: ImageProfile, layout: ProfilePage },
  { path: "/profile-friends/:id", element: FriendProfile, layout: ProfilePage },
  { path: "/video-call/:friendId", element: VideoCallPage, layout: null },
  { path: "/admin", element: Footer, layout: LayoutAdmin },
  { path: "/admin/post", element: PostTable, layout: LayoutPost },
  { path: "/admin/user", element: UserTable, layout: LayoutUser },
];

export { privateRoute, publicRoute };
