import { useFormik } from "formik";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormHelperText,
  IconButton,
  Stack,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Close } from "@mui/icons-material";

import { useCreateCategoryMutation } from "../../../../slices/categories.api.slice";
import { useSnackbar } from "../../../../hooks/useSnackbar";
import { nameAndImageValidation } from "../../../../utils/admin.validation";
import { ImageUploadField } from "../../../../components";

const AddCategoryModal = ({ open, handleClose }) => {
  const [showSnackbar, hideSnackbar, SnackbarComponent] = useSnackbar();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [createCategory] = useCreateCategoryMutation();

  const handleFileUpload = (e) => {
    if (e.currentTarget.files.length)
      formik.setFieldValue("image", e.currentTarget.files[0]);
  };

  // formik submit handler
  const onSubmit = async (values) => {
    hideSnackbar();
    try {
      let formData = new FormData();
      for (let field in values) formData.append(field, values[field]);
      await createCategory(formData).unwrap();
      formik.resetForm();
      handleClose();
    } catch (error) {
      console.log(error);
      showSnackbar(error?.data?.message, "error");
    }
  };

  // formik hook
  const formik = useFormik({
    initialValues: { name: "", image: "" },
    validationSchema: nameAndImageValidation,
    onSubmit,
  });

  return (
    <Dialog
      component="form"
      onSubmit={formik.handleSubmit}
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      sx={{
        "& .MuiDialog-paper": {
          width: "100%",
          maxWidth: "600px",
        },
      }}
    >
      <DialogTitle>Add Category</DialogTitle>

      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <Close />
      </IconButton>

      <DialogContent
        dividers
        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
      >
        <DialogContentText>Please enter category details</DialogContentText>

        <Stack gap={3}>
          {/* name */}
          <TextField
            required
            id="create-category-name"
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />

          {/* image */}
          <ImageUploadField
            id="create-category-image"
            handleFileUpload={handleFileUpload}
          />
          <FormHelperText>
            {formik.touched.image && formik.errors.image}
          </FormHelperText>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? <CircularProgress size={24} /> : "Add"}
        </Button>
      </DialogActions>

      {SnackbarComponent}
    </Dialog>
  );
};
export default AddCategoryModal;
