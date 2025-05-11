import Button from "../../components/Button/Button";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    day: "15",
    month: "4",
    year: "2025",
    gender: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    alert("Đăng ký thành công!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-center text-blue-600 text-4xl font-bold mb-2">
          facebook
        </h1>
        <h2 className="text-center text-xl font-semibold">Tạo tài khoản mới</h2>
        <p className="text-center text-sm text-gray-600 mb-4">
          Nhanh chóng và dễ dàng.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex gap-2">
            <input
              name="lastName"
              placeholder="Họ"
              value={form.lastName}
              onChange={handleChange}
              className="w-1/2 p-2 border rounded"
              required
            />
            <input
              name="firstName"
              placeholder="Tên"
              value={form.firstName}
              onChange={handleChange}
              className="w-1/2 p-2 border rounded"
              required
            />
          </div>

          <div className="text-sm font-medium">Ngày sinh</div>
          <div className="flex gap-2">
            <select
              name="day"
              value={form.day}
              onChange={handleChange}
              className="w-1/3 p-2 border rounded"
            >
              {[...Array(31)].map((_, i) => (
                <option key={i + 1}>{i + 1}</option>
              ))}
            </select>
            <select
              name="month"
              value={form.month}
              onChange={handleChange}
              className="w-1/3 p-2 border rounded"
            >
              {[
                "Tháng 1",
                "Tháng 2",
                "Tháng 3",
                "Tháng 4",
                "Tháng 5",
                "Tháng 6",
                "Tháng 7",
                "Tháng 8",
                "Tháng 9",
                "Tháng 10",
                "Tháng 11",
                "Tháng 12",
              ].map((m, i) => (
                <option key={i + 1} value={i + 1}>
                  {m}
                </option>
              ))}
            </select>
            <select
              name="year"
              value={form.year}
              onChange={handleChange}
              className="w-1/3 p-2 border rounded"
            >
              {Array.from({ length: 100 }, (_, i) => (
                <option key={i} value={2025 - i}>
                  {2025 - i}
                </option>
              ))}
            </select>
          </div>

          <div className="text-sm font-medium">Giới tính</div>
          <div className="flex gap-2">
            {["Nữ", "Nam", "Tùy chỉnh"].map((g) => (
              <label
                key={g}
                className="flex-1 border p-2 rounded flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  onChange={handleChange}
                />
                {g}
              </label>
            ))}
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Mật khẩu mới"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          <Button themes={"bg-green-500"} type="submit">
            Đăng ký
          </Button>
        </form>

        <div className="text-center mt-4">
          <Link to={"/login"} className="text-blue-600 font-medium">
            Bạn đã có tài khoản ư?
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Register;
