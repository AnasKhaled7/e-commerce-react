import Divider from "@mui/material/Divider";
import { useSelector } from "react-redux";

import { Brands, Categories, Products, Slider } from "./components";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo?.isAdmin) navigate("/admin");
  }, [userInfo, navigate]);

  return (
    <>
      <Slider />
      <Divider />
      <div
        style={{ background: "linear-gradient(180deg, #FFF 0%, #F0F7FF 100%)" }}
      >
        <Categories />
      </div>
      <Divider />
      <Products />
      <Divider />
      <div
        style={{ background: "linear-gradient(180deg, #FFF 0%, #F0F7FF 100%)" }}
      >
        <Brands />
      </div>
    </>
  );
};

export default Home;
