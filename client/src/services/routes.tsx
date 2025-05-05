import { createBrowserRouter } from "react-router-dom";
import UserRoute from "../components/ProtectedRoute/UserRoute";
import CreateProductModal from "../components/user/MarketPage/CreateProductModal";
import ProductModal from "../components/user/MarketPage/ProductModal";
import LoginPage from "../pages/auth/LoginPage";
import ErrorPage from "../pages/user/ErrorPage";
import FriendRequestPage from "../pages/user/FriendRequestPage";
import FriendSuggestionPage from "../pages/user/FriendSuggestionPage";
import FriendsListPage from "../pages/user/FriendsListPage";
import FriendsPage from "../pages/user/FriendsPage";
import HomePage from "../pages/user/HomePage";
import Layout from "../pages/user/Layout";
import MarketPage from "../pages/user/MarketPage";
import MyListedProductPage from "../pages/user/MyListedProductPage";
import PostPage from "../pages/user/PostPage";
import ProductCategoryPage from "../pages/user/ProductCategoryPage";
import ProfileAboutPage from "../pages/user/ProfileAboutPage";
import ProfileFriendListPage from "../pages/user/ProfileFriendListPage";
import ProfilePage from "../pages/user/ProfilePage";
import ProfilePhotosPage from "../pages/user/ProfilePhotosPage";
import SearchMarketPage from "../pages/user/SearchMarketPage";
import SearchPage from "../pages/user/SearchPage";
import StoryPage from "../pages/user/StoryPage";
import WatchPage from "../pages/user/WatchPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: "/home",
        element: (
          <UserRoute>
            <HomePage />
          </UserRoute>
        ),
      },
      {
        path: "/search",
        element: (
          <UserRoute>
            <SearchPage />
          </UserRoute>
        ),
      },
      {
        path: "/stories",
        element: (
          <UserRoute>
            <StoryPage />
          </UserRoute>
        ),
      },
      {
        path: "/post/:postId",
        element: (
          <UserRoute>
            <PostPage />
          </UserRoute>
        ),
      },
      {
        path: "/friends",
        element: (
          <UserRoute>
            <FriendsPage />
          </UserRoute>
        ),
        children: [
          {
            path: "requests",
            element: <FriendRequestPage />,
          },
          {
            path: "suggestions",
            element: <FriendSuggestionPage />,
          },
          {
            path: "list",
            element: <FriendsListPage />,
          },
        ],
      },
      {
        path: "/watch",
        element: (
          <UserRoute>
            <WatchPage />
          </UserRoute>
        ),
      },
      {
        path: "/marketplace",
        element: (
          <UserRoute>
            <MarketPage />
          </UserRoute>
        ),
        children: [
          {
            path: "create",
            element: <CreateProductModal />,
          },
          {
            path: "category/:category",
            element: <ProductCategoryPage />,
          },
          {
            path: "item/:productId",
            element: <ProductModal />,
          },
          {
            path: "user/item",
            element: <MyListedProductPage />,
          },
          {
            path: "search",
            element: <SearchMarketPage />,
          },
        ],
      },
      {
        path: "/profile/:userId",
        element: (
          <UserRoute>
            <ProfilePage />
          </UserRoute>
        ),
        children: [
          {
            path: "friends",
            element: <ProfileFriendListPage />,
          },
          {
            path: "about",
            element: <ProfileAboutPage />,
          },
          {
            path: "photos",
            element: <ProfilePhotosPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
