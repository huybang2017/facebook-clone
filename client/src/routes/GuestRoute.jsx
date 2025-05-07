import { Navigate } from "react-router-dom";

const GuestRoute = ({ children }) => {
  //   const { userInfo } = useContext(StoreContext);
  const token = localStorage.getItem("token");

  // Nếu đã đăng nhập thì chuyển về trang chủ
  if (token) {
    return <Navigate to="/" />;
  }

  // Nếu chưa đăng nhập thì cho truy cập
  return children;
};

export default GuestRoute;
