import { useState } from "react";
import axiosInstances from "../utils/axiosInstances";
import { Link } from "react-router-dom";
export function LoginForm({ className, ...props }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstances.post("/api/auth/login", {
        email,
        password,
      });
      if (response.data) {
        localStorage.setItem("token", response.data.accessToken);
        console.log(response.data.data.accessToken);
        window.location.href = "/";
        alert("Đăng nhập thành công!");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };
  return (
    <form className="w-[500px] py-5 px-10">
      <div className="flex flex-col space-y-4 shadow-2xl rounded-2xl border-2 border-gray-200 p-4">
        <div className="mb-2">
          <input
            type="text"
            className="my-2 p-2 w-full border border-borderColor rounded-md outline-none focus:border-primary transition-all ease-out"
            placeholder="Email hoặc số điện thoại"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
        </div>
        <div className="mb-2">
          <input
            type="password"
            className="my-2 p-2 w-full border border-borderColor rounded-md outline-none focus:border-primary transition-all ease-out"
            placeholder="Mật khẩu"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          {/* {error && <p className="text-xs text-red-600 mt-4">{error}</p>} */}
        </div>
        <button
          onClick={handleSubmit}
          className="p-2 w-full bg-blue-500 border rounded-lg text-lg text-white font-bold transition-all ease-linear hover:bg-blue-600 shadow-md cursor-pointer"
        >
          Đăng nhập
        </button>
        <p className="mt-6 text-sm text-center">
          Bạn chưa có tài khoản?{" "}
          <Link to="/signup" className="text-blue-500 mr-4">
            Đăng ký
          </Link>
        </p>
      </div>
    </form>
  );
}
