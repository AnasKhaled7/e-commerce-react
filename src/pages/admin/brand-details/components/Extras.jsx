import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { useUpdateBrandImageMutation } from "../../../../slices/brands.api.slice";
import { imageValidation } from "../../../../utils/admin.validation";
import { ImageUploadField } from "../../../../components";

const Extras = ({ data, showSnackbar, hideSnackbar }) => {
  const { brandId } = useParams();
  const [updateBrandImage] = useUpdateBrandImageMutation();

  const handleFileUpload = (e) => {
    if (e.currentTarget.files.length)
      formik.setFieldValue("image", e.currentTarget.files[0]);
  };

  // formik submit handler
  const onSubmit = async (values) => {
    hideSnackbar();
    try {
      const res = await updateBrandImage({
        brandId,
        image: values.image,
      }).unwrap();

      formik.resetForm();

      showSnackbar(res?.message, "success");
    } catch (error) {
      console.log(error);
      showSnackbar(error?.data?.message, "error");
    }
  };

  // formik hook
  const formik = useFormik({
    initialValues: {
      image: "",
    },
    validationSchema: imageValidation,
    onSubmit,
  });

  return (
    <Paper
      variant="outlined"
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        p: { xs: 2, sm: 4 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        width: "100%",
      }}
    >
      {/* heading */}
      <Stack gap={2} alignItems="center">
        <Typography variant="h4" component="h2">
          {data?.brand?.name}
        </Typography>

        <Typography>{data?.brand?._id}</Typography>
      </Stack>

      {/* image */}
      <Box width={200} height={200} mx="auto">
        <img
          src={data?.brand?.image?.url}
          alt={data?.brand?.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </Box>

      {/* upload image */}
      <Stack direction="row" gap={2} alignItems="center">
        <ImageUploadField
          id="edit-brand-image"
          handleFileUpload={handleFileUpload}
        />

        {/* submit */}
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}
        >
          {formik.isSubmitting ? (
            <CircularProgress size={24} />
          ) : (
            " Update Image"
          )}
        </Button>
      </Stack>
    </Paper>
  );
};
export default Extras;
