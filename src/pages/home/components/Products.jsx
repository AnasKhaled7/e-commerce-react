import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { KeyboardArrowRightRounded } from "@mui/icons-material";

import { Message, ProductCard } from "../../../components";
import { useGetProductsQuery } from "../../../slices/products.api.slice";

const Products = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const page = 1;
  const limit = 4;
  const { data, isLoading, error } = useGetProductsQuery({ page, limit });

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 4,
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
        Products
      </Typography>

      {/* products */}
      <Grid container spacing={2}>
        {isLoading ? (
          <>
            {[1, 2, 3, 4].map((index) => (
              <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                <Skeleton variant="rounded" height={300} />
              </Grid>
            ))}
          </>
        ) : error ? (
          <Grid item xs={12}>
            <Message severity="error">{error?.data?.message}</Message>
          </Grid>
        ) : (
          <>
            {data?.total === 0 ? (
              <Grid item xs={12}>
                <Message severity="info">No products found</Message>
              </Grid>
            ) : (
              <>
                {data?.products.map((product) => (
                  <Grid key={product._id} item xs={12} sm={6} md={4} lg={3}>
                    <ProductCard product={product} />
                  </Grid>
                ))}
              </>
            )}
          </>
        )}
      </Grid>

      <Button
        variant="outlined"
        size="large"
        endIcon={<KeyboardArrowRightRounded />}
        onClick={() => navigate("/products/page/1")}
      >
        View all products
      </Button>
    </Container>
  );
};

export default Products;
