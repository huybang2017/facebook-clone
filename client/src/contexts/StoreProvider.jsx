import { getInfo } from "@/apis/authService";
import { createContext, useEffect, useState } from "react";
import avatarDefault from "../assets/images/default_avatar.jpg";
export const StoreContext = createContext();

const StoreProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      getInfo()
        .then((res) => {
          const user = res.data;
          if (user.image == null) {
            user.image = avatarDefault;
          }
          setUserInfo(user);
        })
        .catch((err) => console.log(err));
    }
  }, [token]);

  return (
    <StoreContext.Provider value={{ userInfo }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
