import { Separator } from "@/components/ui/separator";
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
            "https://scontent.fsgn24-2.fna.fbcdn.net/v/t45.1600-4/483366207_120220422581540712_6822253961876617078_n.jpg?stp=cp0_dst-jpg_q75_s960x960_spS444_tt6&_nc_cat=111&ccb=1-7&_nc_sid=c02adf&_nc_eui2=AeHHvrCI44pZV9zqHQoVR5c4HbPc5P8pZWMds9zk_yllY_avzZSCYDgvNGJx2gMTRJsHLCCBrkvf23NBee3EKd0t&_nc_ohc=CM458cisuEMQ7kNvgFngs0A&_nc_oc=AdmUJaIGMJyDJtliUeeXaPTssnWwBa62H7qEXg4iATgstpvqoVHJmdfp7teOE8nxZbM&_nc_zt=1&_nc_ht=scontent.fsgn24-2.fna&_nc_gid=LDRi_6ApeOnEvl4yNvDrgw&oh=00_AYFy75cTYKDBlNjpK8nuquYyfDXOv1jKNjZIpis0fN4wUw&oe=67E545D8"
          }
          content={"Apply job hot - Deal ngay lương cao"}
        />
        <Advertisement
          link={
            "https://scontent.fsgn24-2.fna.fbcdn.net/v/t45.1600-4/484317729_9428134030612657_5640039799572618469_n.png?stp=cp0_dst-jpg_q90_s960x960_spS444_tt6&_nc_cat=111&ccb=1-7&_nc_sid=c02adf&_nc_eui2=AeGiqxbD8MbnY1xzTRT4WTvWU8GnSS_BxJhTwadJL8HEmBvxTkFng_RhDJPgf4HH7WDJvum2xiiMQwXp3o0Vbe6I&_nc_ohc=M4tKZIXWidMQ7kNvgGmkfBz&_nc_oc=AdkACZci__3jqGGu_UIyGF_bZQPbwb8rfOEQzDPN-0tu-qVoYu_dtg1MbI4GA71ykmE&_nc_zt=1&_nc_ht=scontent.fsgn24-2.fna&_nc_gid=LDRi_6ApeOnEvl4yNvDrgw&oh=00_AYFIzc8KqN6nKHNVmWqws-Eu3BB21Syi3BljwmZTaI8Blw&oe=67E53856"
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
