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

import { useGetProductsQuery } from "../../../slices/products.api.slice";
import { Message, ProductCard } from "../../../components";

const Products = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { data, isLoading, error } = useGetProductsQuery({ limit: 4 });

  return (
    <div
      style={{ background: "linear-gradient(180deg, #FFF 0%, #F0F7FF 100%)" }}
    >
      <Container
        maxWidth="xl"
        component="section"
        sx={{
          py: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
        }}
      >
        <Typography
          component="h2"
          variant={isMobile ? "h4" : "h3"}
          fontWeight={500}
        >
          Products
        </Typography>

        {/* products */}
        <Grid container spacing={2} justifyContent="center" alignItems="center">
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
              {data?.numOfProducts === 0 ? (
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
    </div>
  );
};

export default Products;
