import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import Divider from "@mui/material/Divider";

import { Brands, Categories, Hero, Products } from "./components";

const Home = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo?.isAdmin) navigate("/admin");
  }, [userInfo, navigate]);

  return (
    <>
      <Helmet>
        <title>Nile</title>
      </Helmet>
      <Hero />
      <Divider />
      <Categories />
      <Divider />
      <div
        style={{ background: "linear-gradient(180deg, #FFF 0%, #F0F7FF 100%)" }}
      >
        <Products />
      </div>
      <Divider />
      <Brands />
    </>
  );
};

export default Home;
