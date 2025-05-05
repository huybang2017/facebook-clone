import { useAuthQueryStore } from "../../store/auth-store";
import Unauthorized from "./Unauthorized";

interface Props {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: Props) => {
  const { authStore } = useAuthQueryStore();
  const role = authStore.role;

  return role === "ADMIN" ? <>{children}</> : <Unauthorized />;
};

export default AdminRoute;

