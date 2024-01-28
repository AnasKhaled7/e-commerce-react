import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Divider } from "@mui/material";

import { Navbar, Footer, ScrollToTop, LoadingScreen, Message } from "./";
import { clearCredentials } from "../slices/auth.slice";
import { useLogoutMutation } from "../slices/users.api.slice";

const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout, { isLoading, error }] = useLogoutMutation();

  const { decodedToken } = useSelector((state) => state.auth);

  const logoutHandler = async () => {
    try {
      await logout().unwrap();
      dispatch(clearCredentials());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  if (decodedToken?.isAdmin) {
    return (
      <ScrollToTop>
        <Outlet />
      </ScrollToTop>
    );
  }

  if (isLoading) return <LoadingScreen />;
  if (error) return <Message severity="error">{error?.data?.message}</Message>;

  return (
    <ScrollToTop>
      <Navbar logoutHandler={logoutHandler} />
      <Outlet />
      <Divider />
      <div style={{ backgroundColor: "#f5fafd" }}>
        <Footer />
      </div>
    </ScrollToTop>
  );
};
export default Layout;
