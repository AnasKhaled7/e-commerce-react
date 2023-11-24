import { useParams } from "react-router-dom";
import { Container, Typography } from "@mui/material";

import { useGetCategoryQuery } from "../../slices/categories.api.slice";
import { LoadingScreen, Message, ProductsList } from "../../components";
import { useGetProductsByCategoryQuery } from "../../slices/products.api.slice";

const CategoryProducts = () => {
  const { categoryId } = useParams();
  const { data, isLoading, error } = useGetCategoryQuery(categoryId);

  if (isLoading) return <LoadingScreen />;

  if (error)
    return (
      <Message severity="error">{error?.data?.message || error.error}</Message>
    );

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
        {data?.category?.name}
      </Typography>

      {/* products */}
      <ProductsList
        queryFunction={useGetProductsByCategoryQuery}
        queryArgs={[categoryId]}
      />
    </Container>
  );
};

export default CategoryProducts;
