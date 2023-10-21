import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { UserContext } from "../context/UserProvider";
import { Navbar, Footer, LoadingScreen } from "./";

const Layout = () => {
  const { setUserToken } = useContext(UserContext);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setUserToken(token);
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <LoadingScreen />;
  } else {
    return (
      <>
        <Navbar setLoading={setLoading} />
        <Outlet />
        <Footer />
      </>
    );
  }
};
export default Layout;
