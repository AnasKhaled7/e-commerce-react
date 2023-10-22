import { Divider } from "@mui/material";
import { Categories, Newsletter, Products, Slider } from "./components";

const Home = () => {
  return (
    <>
      <Slider />
      <Divider />
      <Categories />
      <Divider />
      <Products />
      <Divider />
      <Newsletter />
      <Divider />
    </>
  );
};
export default Home;
