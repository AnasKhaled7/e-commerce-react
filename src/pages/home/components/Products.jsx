import { useNavigate } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { ProductsList } from "../../../components";

const Products = () => {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="xl"
      sx={{
        my: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
      }}
    >
      <Typography component="h2" variant="h3" fontWeight={700}>
        Top Products
      </Typography>

      <ProductsList />

      <Button
        variant="outlined"
        size="large"
        endIcon={<KeyboardArrowRightRoundedIcon />}
        onClick={() => navigate("/products")}
      >
        View all products
      </Button>
    </Container>
  );
};

export default Products;
