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

  if (!isValid) {
    return <Navigate to={"/login"} />;
  }

  return children;
};

export default ProtectedRoute;
