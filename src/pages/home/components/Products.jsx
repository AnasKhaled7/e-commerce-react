import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { KeyboardArrowRightRounded } from "@mui/icons-material";

import { ProductsList } from "../../../components";
import { useGetProductsQuery } from "../../../slices/products.api.slice";

const Products = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container
      maxWidth="xl"
      sx={{
        my: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
      }}
    >
      <Typography
        component="h2"
        variant={isMobile ? "h4" : "h3"}
        fontWeight={700}
      >
        Top Products
      </Typography>

      {/* products */}
      <ProductsList queryFunction={useGetProductsQuery} />

      <Button
        variant="outlined"
        size="large"
        endIcon={<KeyboardArrowRightRounded />}
        onClick={() => navigate("/products")}
      >
        View all products
      </Button>
    </Container>
  );
};

export default Products;
