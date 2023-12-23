import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Grid, Pagination, PaginationItem, Skeleton } from "@mui/material";

import {
  Message,
  PageHeader,
  PageSection,
  ProductCard,
} from "../../components";
import { useGetProductsByCategoryQuery } from "../../slices/products.api.slice";

const CategoryProducts = () => {
  const { categoryId, page } = useParams();
  const { data, isLoading, error } = useGetProductsByCategoryQuery({
    categoryId,
    page,
  });

  return (
    <PageSection>
      <Helmet>
        <title>{data?.category || ""} | Nile</title>
      </Helmet>

      <PageHeader text={data?.category} />

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
              to={`/products/category/${categoryId}/page/${item.page}`}
              {...item}
            />
          )}
          sx={{ mt: "auto", mx: "auto" }}
        />
      )}
    </PageSection>
  );
};

export default CategoryProducts;
