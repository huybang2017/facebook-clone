import React from "react";
import { Link } from "react-router-dom";

const Button = ({
  themes = "bg-blue-500",
  to,
  href,
  children,
  className,
  onClick,
}) => {
  let Comp = "button";
  const props = {
    className,
    onClick,
  };

  if (props.to) {
    Comp = Link;
  } else if (props.href) {
    Comp = "a";
  }
  return (
    <Comp
      {...props}
      className={`p-2 w-full ${themes} border rounded-lg text-lg text-white font-bold transition-all ease-linear hover:${props.themes}-600 shadow-md cursor-pointer`}
    >
      {children}
    </Comp>
  );
};

export default Button;
