import Separator from "@/components/Separator/Separator";
import React from "react";
import Advertisement from "./Advertisement";
import { Ellipsis, Option } from "lucide-react";

const userList = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Nguyễn Văn B",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "Nguyễn Văn C",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    name: "Nguyễn Văn D",
    avatar: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: 5,
    name: "Nguyễn Văn E",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 6,
    name: "Nguyễn Văn F",
    avatar: "https://i.pravatar.cc/150?img=6",
  },
  {
    id: 7,
    name: "Nguyễn Văn G",
    avatar: "https://i.pravatar.cc/150?img=7",
  },
  {
    id: 8,
    name: "Nguyễn Văn H",
    avatar: "https://i.pravatar.cc/150?img=9",
  },
];

const RightBar = () => {
  return (
    <div className=" bg-white flex flex-col pb-9">
      <div className="advertisement">
        <h2 className="text-sm font-medium m-2">Được tài trợ</h2>
        <Advertisement
          link={
            "https://i.pinimg.com/736x/ac/6d/b4/ac6db4bf7f3b57669954e12610664a50.jpg"
          }
          content={"Apply job hot - Deal ngay lương cao"}
        />
        <Advertisement
          link={
            "https://i.pinimg.com/736x/9b/ee/06/9bee0697106af3d426957a5f94cf75c5.jpg"
          }
          content={"9Fit Vietnam"}
        />
      </div>
      <Separator />
      <div className="user-contact">
        <h2 className="text-sm font-medium m-2">Người liên hệ</h2>
        {userList.length > 0 &&
          userList.map((user) => {
            return (
              <div
                key={user.id}
                className="user-contact-item flex items-center p-2 mx-1 my-2 hover:bg-gray-100 rounded-md"
              >
                <div className="img max-w-[40%] h-max overflow-hidden rounded-md">
                  <img
                    src={user.avatar}
                    alt="user-avatar"
                    className="w-10 h-10 rounded-full"
                  />
                </div>
                <div className="ad-content pl-3 m-2">
                  <span className="text-sm text-end">{user.name}</span>
                </div>
                <div className="option flex-grow flex justify-end cursor-pointer">
                  <Ellipsis />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default RightBar;
