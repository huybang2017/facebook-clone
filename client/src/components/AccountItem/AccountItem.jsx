import { useContext } from "react";
import { Ellipsis } from "lucide-react";
import { StoreContext } from "@/contexts/StoreProvider";
import { useNavigate } from "react-router-dom";

const AccountItem = ({ header }) => {
  const { userInfo } = useContext(StoreContext);
  const navigate = useNavigate();
  const avatar = userInfo?.data?.profilePicture || userInfo?.image;
  const firstName = userInfo?.data?.firstName || "";
  const lastName = userInfo?.data?.lastName || "";
  const fullName = `${firstName} ${lastName}`.trim();

  const handleClick = () => {
    navigate(`/user/profile/${userInfo?.data?.userId}`);
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center p-2 mx-1 my-2 hover:bg-gray-100 rounded-md transition ease-in cursor-pointer"
    >
      <div className="img max-w-[40%] h-max overflow-hidden rounded-md">
        <img
          src={avatar}
          alt="user-avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>
      <div className="ad-content pl-3 m-2">
        <span className="text-md font-normal">{fullName}</span>
      </div>
      {!header && (
        <div className="option flex-grow flex justify-end cursor-pointer">
          <Ellipsis />
        </div>
      )}
    </div>
  );
};

export default AccountItem;
