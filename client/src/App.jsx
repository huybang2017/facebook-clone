import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/Login";
import NotFound from "./NotFound";
import Home from "./pages/social-media/Home";
import Profile from "./pages/social-media/Profile";
import Chats from "./pages/messager/chat";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<LoginPage />} />
        <Route path="/forgot-password" element={<LoginPage />} />
        <Route path="/reset-password" element={<LoginPage />} />
        <Route path="/verify-email" element={<LoginPage />} />
      </Routes>
    </>
  );
};
export default App;
