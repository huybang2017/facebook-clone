import { getInfo } from "@/apis/authService";
import { createContext, useEffect, useState } from "react";
import avatarDefault from "../assets/images/default_avatar.jpg";
export const StoreContext = createContext();

const StoreProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const token = localStorage.getItem("token");
  useEffect(() => {
    const getInfoUser = async () => {
      if (token) {
        getInfo()
          .then((res) => {
            const user = res.data;
            if (!user.profilePicture) {
              user.profilePicture = avatarDefault;
            }
            setUserInfo(user);
          })
          .catch((err) => console.log(err));
      }
    };

    getInfoUser();
  }, [token]);

  return (
    <StoreContext.Provider value={{ userInfo }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
