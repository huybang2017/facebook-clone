import defaultAvatar from "@/assets/images/default_avatar.jpg";
import { useNavigate } from "react-router-dom";

const AccountItem = ({ data }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/user/profile/${data?.userId}`);
  };

  return (
    <div
      onClick={() => handleClick()}
      className="flex items-center p-2 mx-1 my-2 hover:bg-gray-100 rounded-md transition ease-in cursor-pointer"
    >
      <div className="img max-w-[40%] h-max overflow-hidden rounded-md">
        <img
          src={data?.profilePicture || defaultAvatar}
          alt="user-avatar"
          className="w-10 h-10 rounded-full"
        />
      </div>
      <div className="ad-content pl-3 m-2">
        <span className="text-md text-end font-normal">
          {data?.firstName} {data?.lastName}
        </span>
      </div>
    </div>
  );
};

export default AccountItem;
