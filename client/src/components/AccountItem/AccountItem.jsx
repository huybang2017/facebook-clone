import { useContext } from "react";
import { Ellipsis } from "lucide-react";
import { StoreContext } from "@/contexts/StoreProvider";
const AccountItem = ({ header }) => {
  const { userInfo } = useContext(StoreContext);
  // console.log(userInfo);
  return (
    <div className="flex items-center p-2 mx-1 my-2 hover:bg-gray-100 rounded-md transition ease-in cursor-pointer">
      <div className="img max-w-[40%] h-max overflow-hidden rounded-md">
        <img
          src={userInfo?.image}
          alt="user-avatar"
          className="w-10 h-10 rounded-full"
        />
      </div>
      <div className="ad-content pl-3 m-2">
        <span className={`text-md text-end font-normal`}>{userInfo?.name}</span>
      </div>
      {header ? (
        <></>
      ) : (
        <div className="option flex-grow flex justify-end cursor-pointer">
          <Ellipsis />
        </div>
      )}
    </div>
  );
};

export default AccountItem;
