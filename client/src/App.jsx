import { Route, Routes } from "react-router-dom";
import { privateRoute } from "./routes";
import DefaultLayout from "./pages/layouts/DefaultLayout";
import { Fragment } from "react";
import StoreProvider from "./contexts/StoreProvider";

const App = () => {
  return (
    <StoreProvider>
      <Routes>
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
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </StoreProvider>
  );
};
export default App;
