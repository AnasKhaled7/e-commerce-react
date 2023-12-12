import { useFormik } from "formik";
import * as Yup from "yup";
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
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Close, CloudUpload } from "@mui/icons-material";

import { useCreateBrandMutation } from "../../../../slices/brands.api.slice";
import { useSnackbar } from "../../../../hooks/useSnackbar";

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

const AddBrandModal = ({ open, handleClose }) => {
  const [showSnackbar, hideSnackbar, SnackbarComponent] = useSnackbar();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [createCBrand] = useCreateBrandMutation();

  const handleFileUpload = (e) => {
    if (e.currentTarget.files.length)
      formik.setFieldValue("image", e.currentTarget.files[0]);
  };

  // formik validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    image: Yup.mixed()
      .test(
        "fileSize",
        "File too large",
        (value) => value && value.size <= 1048576
      ) // 1MB
      .test(
        "fileFormat",
        "Unsupported Format",
        (value) =>
          value &&
          ["image/jpg", "image/jpeg", "image/gif", "image/png"].includes(
            value.type
          )
      )
      .required("A file is required"),
  });

  // formik submit handler
  const onSubmit = async (values) => {
    hideSnackbar();
    try {
      let formData = new FormData();
      for (let field in values) formData.append(field, values[field]);
      await createCBrand(formData);
      formik.resetForm();
      handleClose();
    } catch (error) {
      showSnackbar(error?.data?.message, "error");
    }
  };

  // formik hook
  const formik = useFormik({
    initialValues: { name: "", image: "" },
    validationSchema,
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
      <DialogTitle>Add Brand</DialogTitle>

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
        <DialogContentText>Please enter brand details</DialogContentText>

        <Stack gap={3}>
          {/* name */}
          <TextField
            required
            id="create-brand-name"
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />

          {/* image */}
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUpload />}
          >
            Upload file
            <VisuallyHiddenInput
              id="create-brand-image"
              type="file"
              name="image"
              onChange={handleFileUpload}
            />
          </Button>
          <FormHelperText>
            {formik.touched.image && formik.errors.image}
          </FormHelperText>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button
          type="submit"
          disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}
        >
          {formik.isSubmitting ? <CircularProgress size={24} /> : "Add Brand"}
        </Button>
      </DialogActions>

      <SnackbarComponent />
    </Dialog>
  );
};
export default AddBrandModal;
