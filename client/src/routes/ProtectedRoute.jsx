import { useEffect, useState } from "react";
import { getInfo } from "@/apis/authService";
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const [isValid, setIsValid] = useState(null);
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setIsValid(false);
        return;
      }
      try {
        const res = await getInfo();
        if (res.status == 200) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      } catch (err) {
        console.log("Token không hợp lệ ", err);
        localStorage.removeItem("token");
        setIsValid(false);
      }
    };

    verifyToken();
  }, [token]);

  if (isValid === null) {
    return <div className="">Đang xác thực...</div>;
  }

  // Nếu token không hợp lệ, người dùng sẽ được chuyển đến trang đăng nhập
  if (!isValid) {
    return <Navigate to={"/login"} />;
  }

  // Nếu token hợp lệ thì người dùng được phép sử dụng route hiện tại
  return children;
};

export default ProtectedRoute;
