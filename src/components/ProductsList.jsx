import { Grid, Skeleton } from "@mui/material";
import { Message, ProductCard } from "./";

const ProductsList = ({ queryFunction, queryArgs = [] }) => {
  const { data, isLoading, error } = queryFunction(...queryArgs);

  return (
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
          <Message severity="error">
            {error?.data?.message || error.error}
          </Message>
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
  );
};
export default ProductsList;
