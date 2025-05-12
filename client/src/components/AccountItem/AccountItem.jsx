import { useContext } from "react";
import { Ellipsis } from "lucide-react";
import { StoreContext } from "@/contexts/StoreProvider";
import { Link } from "react-router-dom";
const AccountItem = ({ header, to }) => {
  const { userInfo, avatarDefault } = useContext(StoreContext);

  let Comp = "div";

  if (header) {
    Comp = Link;
  }

  return (
    <Comp
      to={to}
      className="flex items-center p-2 mx-1 my-2 hover:bg-gray-100 rounded-md transition ease-in cursor-pointer"
    >
      <div className="img max-w-[40%] h-max overflow-hidden rounded-md">
        <img
          src={userInfo?.data?.profilePicture || avatarDefault}
          alt="user-avatar"
          className="w-10 h-10 rounded-full"
        />
      </div>
      <div className="ad-content pl-3 m-2">
        <span className={`text-md text-end font-normal`}>
          {userInfo?.data.firstName} {userInfo?.data.lastName}
        </span>
      </div>
      {header ? (
        <></>
      ) : (
        <div className="option flex-grow flex justify-end cursor-pointer">
          <Ellipsis />
        </div>
      )}
    </Comp>
  );
};

export default AccountItem;
