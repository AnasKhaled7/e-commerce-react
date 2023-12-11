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

import { CategoryCard, Message } from "../../components";
import { useGetCategoriesQuery } from "../../slices/categories.api.slice";

const Categories = () => {
  const { page } = useParams();
  const { data, isLoading, error } = useGetCategoriesQuery({ page });

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
        <title>Categories | Nile</title>
      </Helmet>
      {/* title */}
      <Typography component="h2" variant="h3">
        Categories
      </Typography>

      {/* categories */}
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
                <Message severity="info">No categories found</Message>
              </Grid>
            ) : (
              <>
                {data?.categories.map((category) => (
                  <Grid key={category._id} item xs={12} sm={6} md={4} lg={3}>
                    <CategoryCard item={category} />
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
              to={`/categories/page/${item.page}`}
              {...item}
            />
          )}
          sx={{ mt: "auto", mx: "auto" }}
        />
      )}
    </Container>
  );
};
export default Categories;
