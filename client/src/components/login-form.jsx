import { useContext, useState } from "react";
import { login } from "@/apis/authService";
import { Link } from "react-router-dom";
import { ToastContext } from "@/contexts/ToastProvider";
export function LoginForm({ className, ...props }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { toast } = useContext(ToastContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({
      email,
      password,
    })
      .then((res) => {
        localStorage.setItem("token", res.data.jwtToken);
        toast.success(res.data.message);
        setTimeout(() => (window.location.href = "/"), 2000);
      })
      .catch((error) => {
        toast.error(error.data.message);
      });
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
          <Link to="/register" className="text-blue-500 mr-4">
            Đăng ký
          </Link>
        </p>
      </div>
    </form>
  );
}
