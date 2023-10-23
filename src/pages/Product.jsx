import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import product from "../assets/product-5.png";
import { SizeFilter } from "../components";

const Product = () => {
  return (
    <Container
      maxWidth="xl"
      sx={{
        my: 4,
        display: "flex",
        alignItems: "center",
        flexDirection: { xs: "column", md: "row" },
        gap: 4,
      }}
    >
      {/* image container */}
      <Box flex={1}>
        <img
          src={product}
          alt="product"
          style={{
            width: "100%",
            height: "100%",
            maxHeight: "450px",
            objectFit: "contain",
          }}
        />
      </Box>

      {/* info container */}
      <Stack flex={1} gap={4}>
        {/* title */}
        <Typography variant="h4">Product Title</Typography>

        {/* description */}
        <Typography>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          laboriosam. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Quisquam, laboriosam. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Quisquam, laboriosam. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Quisquam, laboriosam. Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Quisquam, laboriosam. Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          laboriosam. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Quisquam, laboriosam. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Quisquam, laboriosam. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Quisquam, laboriosam. Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Quisquam, laboriosam.
        </Typography>

        {/* price */}
        <Typography variant="h5">Price: 500 LE</Typography>

        {/* colors */}
        <Stack direction="row" alignItems="center" gap={2}>
          <Typography variant="h6">Available Colors:</Typography>
          <Stack direction="row" gap={1}>
            {["red", "blue", "green", "yellow", "black", "white"].map(
              (color) => (
                <Box
                  key={color}
                  sx={{
                    width: 25,
                    height: 25,
                    border: "1px solid #ccc",
                    borderRadius: "50%",
                    bgcolor: color,
                    cursor: "pointer",
                  }}
                />
              )
            )}
          </Stack>
        </Stack>

        {/* filter by size */}
        <SizeFilter />

        {/* add count */}
        <Stack direction="row" alignItems="center" gap={2}>
          <Typography variant="h6">Count:</Typography>
          <Stack direction="row" alignItems="center" gap={1}>
            <IconButton size="small">
              <RemoveRoundedIcon />
            </IconButton>
            <Typography component="p" variant="h5" fontWeight={300}>
              1
            </Typography>
            <IconButton size="small">
              <AddRoundedIcon />
            </IconButton>
          </Stack>
        </Stack>

        {/* add to cart */}
        <Button
          variant="contained"
          size="large"
          endIcon={<AddShoppingCartRoundedIcon />}
        >
          Add to Cart
        </Button>
      </Stack>
    </Container>
  );
};
export default Product;
