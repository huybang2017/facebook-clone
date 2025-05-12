import { Link } from "react-router-dom";

const ActionMenuItem = ({ icon, text, to, href, onClick }) => {
  let Comp = "button";
  if (to) {
    Comp = Link;
  } else if (href) {
    Comp = "a";
  }
  return (
    <Comp
      href={href}
      to={to}
      onClick={onClick}
      className="flex items-center w-full py-2 px-4 my-2 hover:bg-gray-100 rounded-md transition ease-in duration-100 cursor-pointer"
    >
      <div className="flex items-center justify-center">{icon}</div>
      <span className="text-md font-normal text-gray-500 ml-4">{text}</span>
    </Comp>
  );
};

export default ActionMenuItem;
