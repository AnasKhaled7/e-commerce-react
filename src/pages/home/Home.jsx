import { Divider } from "@mui/material";
import { Categories, Products, Slider } from "./components";

const Home = () => {
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
    </>
  );
};

export default Home;
