import { Navigate } from "react-router-dom";

const GuestRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (token) {
    if (role === "ADMIN") {
      return <Navigate to="/admin" />;
    } else {
      return <Navigate to="/" />;
    }
  }

  return children;
};

export default GuestRoute;
