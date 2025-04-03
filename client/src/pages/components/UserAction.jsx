import React, { useState } from "react";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import TippyWrapper from "@/components/Wrapper/TippyWrapper";
import { Separator } from "@/components/ui/separator";

import AccountItem from "@/components/AccountItem/AccountItem";
import { CircleHelp, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const UserAction = () => {
  const [visible, setVisible] = useState(false);
  return (
    <Tippy
      interactive
      visible={visible}
      onClickOutside={() => setVisible(false)}
      offset={[-120, 0]}
      render={(attrs) => (
        <div
          {...attrs}
          tabIndex={"-1"}
          className="w-[280px] max-h-[calc(100vh-80px)] rounded-lg bg-white shadow-[-6px_5px_16px_7px_rgba(0,_0,_0,_0.2)]"
        >
          <TippyWrapper>
            <AccountItem header />
            <Separator />
            <div className="flex items-center p-2 my-2 hover:bg-gray-100 rounded-md transition ease-in duration-100 cursor-pointer">
              <div className="flex items-center justify-center w-11 h-11 rounded-full bg-gray-200">
                <CircleHelp className="w-6 h-6" />
              </div>
              <span className="text-md font-normal text-gray-500 ml-4">
                Đóng góp ý kiến
              </span>
            </div>
            <Link
              to={"/login"}
              className="flex items-center p-2 my-2 hover:bg-gray-100 rounded-md transition ease-in duration-100 cursor-pointer"
            >
              <div className="flex items-center justify-center w-11 h-11 rounded-full bg-gray-200">
                <LogOut className="w-6 h-6" />
              </div>
              <span className="text-md font-normal text-gray-500 ml-4">
                Đăng xuất
              </span>
            </Link>
          </TippyWrapper>
        </div>
      )}
    >
      <div className="img max-w-[40%] h-max ml-4 overflow-hidden rounded-md">
        <button
          className=" cursor-pointer"
          onClick={() => setVisible(!visible)}
        >
          <img
            src="https://i.pinimg.com/736x/f8/dc/9a/f8dc9ac53d0fe48d2710c5c0057dc857.jpg"
            alt="user-avatar"
            className="w-10 h-10 rounded-full"
          />
        </button>
      </div>
    </Tippy>
  );
};

export default UserAction;
