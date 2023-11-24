import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { AdminLayout } from "../pages";

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo?.isAdmin ? <AdminLayout /> : <Navigate to="/login" replace />;
};
export default AdminRoute;
