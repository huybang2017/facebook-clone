import { Route, Routes } from "react-router-dom";
import { privateRoute, publicRoute } from "./routes";
import DefaultLayout from "./pages/layouts/DefaultLayout";
import { Fragment } from "react";
import StoreProvider from "./contexts/StoreProvider";
import ProtectedRoute from "./routes/ProtectedRoute";
import GuestRoute from "./routes/GuestRoute";

const App = () => {
  return (
    <StoreProvider>
      <Routes>
        {/* Đây là các route không cần phải đăng nhập mà vẫn có quyền truy cập */}
        {publicRoute.map((route, index) => {
          const Page = route.element;
          let Layout = route.layout ?? DefaultLayout;
          if (route.layout === null) Layout = Fragment;

          return (
            <Route
              key={index}
              path={route.path}
              element={
                <GuestRoute>
                  <Layout>
                    <Page />
                  </Layout>
                </GuestRoute>
              }
            />
          );
        })}

        {/* Đây là các route cần phải đăng nhập/xác thực thì mới có quyền truy cập */}
        {privateRoute.map((route, index) => {
          const Page = route.element;

          let Layout = DefaultLayout;

          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout === null) {
            Layout = Fragment;
          }

          return (
            <Route
              key={index}
              path={route.path}
              element={
                <ProtectedRoute>
                  <Layout>
                    <Page />
                  </Layout>
                </ProtectedRoute>
              }
            />
          );
        })}
      </Routes>
    </StoreProvider>
  );
};
export default App;
