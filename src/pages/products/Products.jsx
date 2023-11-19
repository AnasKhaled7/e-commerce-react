import { Container, Typography } from "@mui/material";
import { ProductsList } from "../../components";

const Products = () => {
  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        gap: 4,
        minHeight: { xs: "calc(100vh - 56px)", sm: "calc(100vh - 64px)" },
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
