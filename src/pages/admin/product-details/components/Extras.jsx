import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";

import { useUpdateProductImageMutation } from "../../../../slices/products.api.slice";
import { imageValidation } from "../../../../utils/admin.validation";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const Extras = ({ data, showSnackbar, hideSnackbar }) => {
  const { productId } = useParams();
  const [updateProductImage] = useUpdateProductImageMutation();

  // formik submit handler
  const onSubmit = async (values) => {
    hideSnackbar();
    try {
      const res = await updateProductImage({
        productId,
        image: values.image,
      }).unwrap();

      formik.resetForm();

      showSnackbar(res?.message, "success");
    } catch (error) {
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

  const handleFileUpload = (e) => {
    if (e.currentTarget.files.length)
      formik.setFieldValue("image", e.currentTarget.files[0]);
  };

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
          {data?.product?.name}
        </Typography>

        <Typography>{data?.product?._id}</Typography>
      </Stack>

      {/* image */}
      <Box width={200} height={200} mx="auto">
        <img
          src={data?.product?.image?.url}
          alt={data?.product?.name}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      </Box>

      {/* upload image */}
      <Stack direction="row" gap={2} alignItems="center">
        <Button
          component="label"
          size="large"
          variant="outlined"
          startIcon={<CloudUpload />}
        >
          Upload Image
          <VisuallyHiddenInput
            id="edot-product-image"
            type="file"
            name="image"
            onChange={handleFileUpload}
          />
        </Button>

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
