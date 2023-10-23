import { Divider } from "@mui/material";
import { Categories, Products, Slider } from "./components";

const Home = () => {
  return (
    <>
      <Slider />
      <Divider />
      <Categories />
      <Divider />
      <Products />
    </>
  );
};
export default Home;
