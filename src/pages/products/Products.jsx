import { Container, Typography } from "@mui/material";
import { ProductsList } from "../../components";

const Products = () => {
  return (
    <Container
      maxWidth="xl"
      sx={{
        my: 4,
        display: "flex",
        flexDirection: "column",
        gap: 4,
        minHeight: "80vh",
      }}
    >
      {/* title */}
      <Typography component="h2" variant="h3">
        Our Products
      </Typography>

      {/* products */}
      <ProductsList />
    </Container>
  );
};
export default Products;
