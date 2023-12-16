import { useParams } from "react-router-dom";
import { Stack } from "@mui/material";

import { useGetBrandQuery } from "../../../slices/brands.api.slice";
import { useSnackbar } from "../../../hooks/useSnackbar";
import { LoadingScreen, Message } from "../../../components";
import { Extras, UpdateBrandForm } from "./components";

const BrandDetails = () => {
  const { brandId } = useParams();
  const [showSnackbar, hideSnackbar, SnackbarComponent] = useSnackbar();

  const { data, isLoading, error } = useGetBrandQuery(brandId);

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
      <UpdateBrandForm
        data={data}
        showSnackbar={showSnackbar}
        hideSnackbar={hideSnackbar}
      />

      {SnackbarComponent}
    </Stack>
  );
};
export default BrandDetails;
