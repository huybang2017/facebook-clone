import clsx from "clsx";
import React from "react";
import { Link } from "react-router-dom";

const Button = ({ to, href, children, className = "", onClick }) => {
  let Comp = "button";
  const props = { onClick };

  if (to) {
    Comp = Link;
    props.to = to;
  } else if (href) {
    Comp = "a";
    props.href = href;
  }

  const defaultClass = `
    p-2 w-full border rounded-md text-lg text-white bg-blue-500 hover:bg-blue-600 font-bold 
    transition-all ease-linear shadow-md cursor-pointer
  `;

  return (
    <Comp {...props} className={clsx(defaultClass, className)}>
      {children}
    </Comp>
  );
};

export default Button;
