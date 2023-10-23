import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Divider } from "@mui/material";
import { UserContext } from "../context/UserProvider";
import { Navbar, Footer, Newsletter, ScrollToTop } from "./";

const Layout = () => {
  const { setUserToken } = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setUserToken(token);
    // eslint-disable-next-line
  }, []);

  return (
    <ScrollToTop>
      <Navbar />
      <Outlet />
      <Divider />
      <Newsletter />
      <Divider />
      <Footer />
    </ScrollToTop>
  );
};
export default Layout;
