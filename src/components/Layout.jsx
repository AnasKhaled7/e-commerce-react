import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Divider } from "@mui/material";

import { Navbar, Footer, ScrollToTop } from "./";

const Layout = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo?.isAdmin ? (
    <ScrollToTop>
      <Outlet />
    </ScrollToTop>
  ) : (
    <ScrollToTop>
      <Navbar />
      <Outlet />
      <Divider />
      <div style={{ backgroundColor: "#f5fafd" }}>
        <Footer />
      </div>
    </ScrollToTop>
  );
};
export default Layout;
