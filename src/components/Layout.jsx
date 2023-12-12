import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Divider } from "@mui/material";

import { Navbar, Footer, ScrollToTop, LoadingScreen } from "./";
import { clearCredentials } from "../slices/auth.slice";
import { useLogoutMutation } from "../slices/users.api.slice";
import { Message } from "@mui/icons-material";

const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout, { isLoading, error }] = useLogoutMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const logoutHandler = async () => {
    try {
      await logout().unwrap();
      dispatch(clearCredentials());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return userInfo?.isAdmin ? (
    <ScrollToTop>
      <Outlet />
    </ScrollToTop>
  ) : (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : error ? (
        <Message severity="error">{error?.data?.message}</Message>
      ) : (
        <ScrollToTop>
          <Navbar logoutHandler={logoutHandler} />
          <Outlet />
          <Divider />
          <div style={{ backgroundColor: "#f5fafd" }}>
            <Footer />
          </div>
        </ScrollToTop>
      )}
    </>
  );
};
export default Layout;
