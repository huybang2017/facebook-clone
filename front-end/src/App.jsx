import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/Login";
import NotFound from "./NotFound";
import Test from "./pages/Test";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<LoginPage />} />
        <Route path="/forgot-password" element={<LoginPage />} />
        <Route path="/reset-password" element={<LoginPage />} />
        <Route path="/verify-email" element={<LoginPage />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </>
  );
};
export default App;
