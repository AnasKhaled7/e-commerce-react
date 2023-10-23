import { Box, Grid, Paper, Stack } from "@mui/material";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import product1 from "../assets/product-1.png";
import product2 from "../assets/product-2.png";
import product3 from "../assets/product-3.png";
import product4 from "../assets/product-4.png";
import product5 from "../assets/product-5.png";
import product6 from "../assets/product-6.png";
import product7 from "../assets/product-7.png";
import product8 from "../assets/product-8.png";

const products = [
  {
    img: product1,
    title: "Nike Air Max 270",
  },
  {
    img: product2,
    title: "Nike Air Force 1 '07",
  },
  {
    img: product3,
    title: "Nike Air Max 97",
  },
  {
    img: product4,
    title: "Nike Air Max 270 React",
  },
  {
    img: product5,
    title: "Nike Air Max 270 React",
  },
  {
    img: product6,
    title: "Nike Air Max 270 React",
  },
  {
    img: product7,
    title: "Nike Air Max 270 React",
  },
  {
    img: product8,
    title: "Nike Air Max 270 React",
  },
];

const iconContainer = {
  width: 40,
  height: 40,
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  bgcolor: "#fff",
  cursor: "pointer",
  transition: "all 0.4s ease",
  "&:hover": {
    bgcolor: "#e9f5f5",
    transform: "scale(1.1)",
  },
};

const Product = ({ item }) => {
  return (
    <Paper
      variant="outlined"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 300,
        bgcolor: "#f5fbfd",
        position: "relative",
      }}
    >
      {/* circle */}
      <Box
        width={200}
        height={200}
        borderRadius="50%"
        bgcolor="#fff"
        position="absolute"
      />

      <img
        src={item.img}
        alt={item.title}
        style={{ height: "75%", zIndex: 2 }}
      />

      <Stack
        direction="row"
        position="absolute"
        zIndex={3}
        bgcolor="rgba(0,0,0,0.2)"
        alignItems="center"
        justifyContent="center"
        gap={2}
        sx={{
          inset: 0,
          opacity: 0,
          transition: "all 0.4s ease",
          "&:hover": {
            opacity: 1,
          },
        }}
      >
        <Box sx={iconContainer}>
          <AddShoppingCartRoundedIcon />
        </Box>
        <Box sx={iconContainer}>
          <SearchRoundedIcon />
        </Box>
        <Box sx={iconContainer}>
          <FavoriteBorderRoundedIcon />
        </Box>
      </Stack>
    </Paper>
  );
};

const ProductsList = () => {
  return (
    <Grid container spacing={2}>
      {products.map((item, index) => (
        <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
          <Product item={item} />
        </Grid>
      ))}
    </Grid>
  );
};
export default ProductsList;
