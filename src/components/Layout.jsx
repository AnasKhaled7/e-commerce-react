import { Outlet } from "react-router-dom";
import { Divider } from "@mui/material";
import { Navbar, Footer, ScrollToTop } from "./";

const Layout = () => {
  return (
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
