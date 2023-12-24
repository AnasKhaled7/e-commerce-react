import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const { decodedToken } = useSelector((state) => state.auth);

  if (decodedToken?.exp * 1000 > Date.now()) return <Outlet />;
  return <Navigate to="/login" replace />;
};
export default PrivateRoute;
