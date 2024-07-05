import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../store";

function PrivateRoutes() {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;
