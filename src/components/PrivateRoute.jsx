import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const { userInfo, token } = useSelector((state) => state.auth);

  return userInfo && token ? <Outlet /> : <Navigate to="/login" replace />;
};
export default PrivateRoute;
