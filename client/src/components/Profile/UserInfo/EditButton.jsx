import React from "react";

const EditButton = ({
  friend = true,
  label,
  onClick,
  className = "",
  icon,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition ${className}`}
    >
      {icon && icon}
      {label}
    </button>
  );
};
export default EditButton;
