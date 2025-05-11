import Navbar from "./Navbar";
import Search from "./Search";
import UserAction from "./UserAction";

export default function Header() {
  return (
    <header className="flex items-center justify-between w-full h-[80px] px-8 bg-white border-b border-gray-300">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-blue-700 cursor-pointer">
          Facebook
        </h1>
      </div>
      <Navbar />
      <div className="flex items-center">
        <Search />
        <UserAction />
      </div>
    </header>
  );
}
