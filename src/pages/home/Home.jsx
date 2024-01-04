import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import Divider from "@mui/material/Divider";

import { Brands, Categories, Hero, Products } from "./components";

const Home = () => {
  const navigate = useNavigate();
  const { decodedToken } = useSelector((state) => state.auth);

  useEffect(() => {
    if (decodedToken?.isAdmin) navigate("/admin");
  }, [decodedToken, navigate]);

  return (
    <>
      <Helmet>
        <title>Nile</title>
      </Helmet>
      <Hero />
      <Categories />
      <Divider />
      <Products />
      <Divider />
      <Brands />
    </>
  );
};

export default Home;
