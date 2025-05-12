import React from "react";
import Header from "../components/Header";
const OnlyHeader = ({ children }) => {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <div className="fixed top-0 left-0 right-0 max-h-max z-10">
        <Header />
      </div>

      <div className="w-full lg:mx-[360px] flex justify-center mt-[100px]">
        {children}  
      </div>
    </div>
  );
};

export default OnlyHeader;
