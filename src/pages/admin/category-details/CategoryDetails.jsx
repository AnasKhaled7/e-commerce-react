import { useParams } from "react-router-dom";
import { Stack } from "@mui/material";

import { useGetCategoryQuery } from "../../../slices/categories.api.slice";
import { useSnackbar } from "../../../hooks/useSnackbar";
import { LoadingScreen, Message } from "../../../components";
import { Extras, UpdateCategoryForm } from "./components";

const CategoryDetails = () => {
  const { categoryId } = useParams();
  const [showSnackbar, hideSnackbar, SnackbarComponent] = useSnackbar();

  const { data, isLoading, error } = useGetCategoryQuery(categoryId);

  if (isLoading) return <LoadingScreen />;
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
      <UpdateCategoryForm
        data={data}
        showSnackbar={showSnackbar}
        hideSnackbar={hideSnackbar}
      />

      <SnackbarComponent />
    </Stack>
  );
};
export default CategoryDetails;
