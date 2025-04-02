import { LoginForm } from "@/components/login-form";

const LoginPage = () => {
  return (
    <div className="flex min-h-svh items-center justify-center bg-muted mx-auto md:p-10 px-10">
      <div className="mr-4 mb-20">
        <h6 className="text-blue-500 text-5xl font-bold mb-4">Facebook</h6>
        <p className="text-lg">
          Facebook giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống của
          bạn.
        </p>
      </div>
      <LoginForm />
    </div>
  );
};
export default LoginPage;
