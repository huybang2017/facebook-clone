import { Route, Routes } from "react-router-dom";
import { privateRoute, publicRoute } from "./routes";
import DefaultLayout from "./pages/layouts/DefaultLayout";
import { Fragment } from "react";
import StoreProvider from "./contexts/StoreProvider";
import ProtectedRoute from "./routes/ProtectedRoute";
import GuestRoute from "./routes/GuestRoute";
import ToastProvider from "./contexts/ToastProvider";
import { NotificationProvider } from "./contexts/NotificationProvider";
import { ChatProvider } from "./contexts/ChatProvider";

const App = () => {
  return (
    <StoreProvider>
      <ToastProvider>
        <NotificationProvider>
          <ChatProvider>
            <Routes>
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
          </ChatProvider>
        </NotificationProvider>
      </ToastProvider>
    </StoreProvider>
  );
};
export default App;
