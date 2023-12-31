import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { useUpdateBrandMutation } from "../../../../slices/brands.api.slice";

const UpdateBrandForm = ({ data, showSnackbar, hideSnackbar }) => {
  const { brandId } = useParams();
  const [updateBrand] = useUpdateBrandMutation();

  // formik validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
  });

  // formik submit handler
  const onSubmit = async (values) => {
    hideSnackbar();
    try {
      const changedValues = {};
      for (const key in values) {
        if (values[key] !== formik.initialValues[key]) {
          changedValues[key] = values[key];
        }
      }

      if (Object.keys(changedValues).length === 0) {
        showSnackbar("Nothing to update", "info");
        return;
      }

      const res = await updateBrand({
        brandId,
        brand: changedValues,
      }).unwrap();

      showSnackbar(res?.message, "success");
    } catch (error) {
      console.log(error);
      showSnackbar(error?.data?.message, "error");
    }
  };

  // formik hook
  const formik = useFormik({
    initialValues: {
      name: data?.brand?.name || "",
    },
    validationSchema,
    onSubmit,
    enableReinitialize: true,
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
        gap: 4,
        width: "100%",
      }}
    >
      {/* heading */}
      <Typography variant="h5" component="h3" textAlign="center">
        Edit Brand
      </Typography>

      {/* name */}
      <TextField
        required
        id="edit-brand-name"
        name="name"
        label="Name"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />

      {/* submit button */}
      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}
      >
        {formik.isSubmitting ? <CircularProgress size={24} /> : "Update"}
      </Button>
    </Paper>
  );
};
export default UpdateBrandForm;
