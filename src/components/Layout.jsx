import { Outlet } from "react-router-dom";
import { Divider } from "@mui/material";
import { Navbar, Footer, Newsletter, ScrollToTop } from "./";

const Layout = () => {
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
