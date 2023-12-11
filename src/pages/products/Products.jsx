import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Container,
  Grid,
  Pagination,
  PaginationItem,
  Skeleton,
  Typography,
} from "@mui/material";

import { Message, ProductCard } from "../../components";
import { useGetProductsQuery } from "../../slices/products.api.slice";

const Products = () => {
  const { page } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({ page });
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
      <Helmet>
        <title>Products | Nile</title>
      </Helmet>
      {/* title */}
      <Typography component="h2" variant="h3">
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

      {/* pagination */}
      {data?.pages > 1 && (
        <Pagination
          count={data?.pages}
          page={Number(page) || 1}
          variant="outlined"
          shape="rounded"
          size="large"
          color="primary"
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              to={`/products/page/${item.page}`}
              {...item}
            />
          )}
          sx={{ mt: "auto", mx: "auto" }}
        />
      )}
    </Container>
  );
};
export default Products;
