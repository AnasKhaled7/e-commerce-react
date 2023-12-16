import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import {
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { useUpdateCategoryMutation } from "../../../../slices/categories.api.slice";
import { nameValidation } from "../../../../utils/admin.validation";

const UpdateCategoryForm = ({ data, showSnackbar, hideSnackbar }) => {
  const { categoryId } = useParams();
  const [updateCategory] = useUpdateCategoryMutation();

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

      const res = await updateCategory({
        categoryId,
        category: changedValues,
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
      name: data?.category?.name || "",
    },
    validationSchema: nameValidation,
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
        Edit Category
      </Typography>

      {/* name */}
      <TextField
        required
        id="edit-category-name"
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
export default UpdateCategoryForm;
