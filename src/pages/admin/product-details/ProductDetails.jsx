import { useParams } from "react-router-dom";
import { Stack } from "@mui/material";

import { useGetProductQuery } from "../../../slices/products.api.slice";
import { useSnackbar } from "../../../hooks/useSnackbar";
import { useGetCategoriesNamesQuery } from "../../../slices/categories.api.slice";
import { useGetBrandsNamesQuery } from "../../../slices/brands.api.slice";
import { LoadingScreen, Message } from "../../../components";
import { Extras, UpdateProductForm } from "./components";

const ProductEdit = () => {
  const { productId } = useParams();
  const [showSnackbar, hideSnackbar, SnackbarComponent] = useSnackbar();

  const { data, isLoading, error } = useGetProductQuery(productId);
  const { data: categories, isLoading: categoriesLoading } =
    useGetCategoriesNamesQuery();
  const { data: brands, isLoading: brandsLoading } = useGetBrandsNamesQuery();

  if (isLoading || categoriesLoading || brandsLoading) return <LoadingScreen />;
  if (error) return <Message severity="error">{error?.data?.message}</Message>;

  return (
    <Stack gap={2} direction={{ xs: "column", md: "row" }}>
      {/* data */}
      <Extras
        data={data}
        showSnackbar={showSnackbar}
        hideSnackbar={hideSnackbar}
      />

      {/* form */}
      <UpdateProductForm
        data={data}
        categories={categories}
        brands={brands}
        showSnackbar={showSnackbar}
        hideSnackbar={hideSnackbar}
      />

      <SnackbarComponent />
    </Stack>
  );
};
export default ProductEdit;
