import React from "react";
import { Ellipsis } from "lucide-react";

const AccountItem = ({ header }) => {
  return (
    <div className="flex items-center p-2 mx-1 my-2 hover:bg-gray-100 rounded-md transition ease-in cursor-pointer">
      <div className="img max-w-[40%] h-max overflow-hidden rounded-md">
        <img
          src="https://i.pinimg.com/736x/f8/dc/9a/f8dc9ac53d0fe48d2710c5c0057dc857.jpg"
          alt="user-avatar"
          className="w-10 h-10 rounded-full"
        />
      </div>
      <div className="ad-content pl-3 m-2">
        <span className={`text-md text-end font-normal`}>Huỳnh Lê Phúc</span>
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
