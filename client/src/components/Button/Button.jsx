import React from "react";

const Button = ({ to, href, children }) => {
  let Comp = "button";

  return (
    <Comp className="p-2 w-full bg-blue-500 border rounded-lg text-lg text-white font-bold transition-all ease-linear hover:bg-blue-600 shadow-md cursor-pointer">
      {children}
    </Comp>
  );
};

export default Button;
