import React, { useContext, useEffect, useState } from "react";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import TippyWrapper from "@/components/Wrapper/TippyWrapper";
import Separator from "@/components/Separator/Separator";
import { StoreContext } from "@/contexts/StoreProvider";
import AccountItem from "@/components/AccountItem/AccountItem";
import { CircleHelp, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import MyModal from "@/components/Modal/MyModal";

const UserAction = () => {
  const [visible, setVisible] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { userInfo, avatarDefault } = useContext(StoreContext);
  const navigate = useNavigate();
  const onCloseModal = () => setOpenModal(false);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  useEffect(() => {});
  return (
    <>
      <MyModal
        open={openModal}
        setOpen={setOpenModal}
        onClose={onCloseModal}
        type=""
      >
        <div className="flex flex-col items-center justify-center text-center p-4">
          <p className="text-xl text-blue-500 font-semibold my-4">
            Đăng xuất khoải Facebook Clone?
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setOpenModal(false)}
              className="mt-6 px-12 py-3 bg-gray-50 text-gray-400 font-bold rounded-lg shadow-md hover:bg-gray-100 transition cursor-pointer"
            >
              Quay lại
            </button>
            <button
              onClick={handleLogout}
              className="mt-6 px-12 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition cursor-pointer"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </MyModal>
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
              <AccountItem
                header
                to={`/user/profile/${userInfo?.data.userId}`}
              />
              <Separator />
              <div className="flex items-center p-2 my-2 hover:bg-gray-100 rounded-md transition ease-in duration-100 cursor-pointer">
                <div className="flex items-center justify-center w-11 h-11 rounded-full bg-gray-200">
                  <CircleHelp className="w-6 h-6" />
                </div>
                <span className="text-md font-normal text-gray-500 ml-4">
                  Đóng góp ý kiến
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center p-2 my-2 hover:bg-gray-100 rounded-md transition ease-in duration-100 cursor-pointer"
              >
                <div className="flex items-center justify-center w-11 h-11 rounded-full bg-gray-200">
                  <LogOut className="w-6 h-6" />
                </div>
                <span className="text-md font-normal text-gray-500 ml-4">
                  Đăng xuất
                </span>
              </button>
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
              src={userInfo?.data?.profilePicture || avatarDefault}
              alt="user-avatar"
              className="w-10 h-10 rounded-full"
            />
          </button>
        </div>
      </Tippy>
    </>
  );
};

export default UserAction;
