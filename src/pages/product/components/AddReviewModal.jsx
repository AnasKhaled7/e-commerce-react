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
  IconButton,
  Rating,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Close } from "@mui/icons-material";

import { useCreateReviewMutation } from "../../../slices/reviews.api.slice";

const AddReviewModal = ({
  productId,
  open,
  handleClose,
  showSnackbar,
  hideSnackbar,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [createReview] = useCreateReviewMutation();

  // formik validation schema
  const validationSchema = Yup.object({
    rating: Yup.number().min(1).max(5).required("Rating is required"),
    comment: Yup.string(),
  });

  // formik submit handler
  const onSubmit = async (values) => {
    hideSnackbar();
    try {
      const res = await createReview({ productId, data: values }).unwrap();
      formik.resetForm();
      handleClose();
      showSnackbar(res?.message, "success");
    } catch (error) {
      console.log(error);
      showSnackbar(error?.data?.message || error.error, "error");
    }
  };

  // formik hook
  const formik = useFormik({
    initialValues: {
      rating: 0,
      comment: "",
    },
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
      <DialogTitle>Add Review</DialogTitle>

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
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <DialogContentText>
          Please share your experience with us
        </DialogContentText>

        <Stack gap={4}>
          {/* rating */}
          <Stack direction="row" alignItems="center" gap={1}>
            <Rating
              size="large"
              name="rating"
              value={Number(formik.values.rating)}
              onChange={formik.handleChange}
            />
            <Typography variant="caption" color="text.secondary">
              ({formik.values.rating} stars)
            </Typography>
          </Stack>

          {/* comment */}
          <TextField
            id="add-product-comment"
            name="comment"
            label="Comment"
            value={formik.values.comment}
            onChange={formik.handleChange}
            error={formik.touched.comment && Boolean(formik.errors.comment)}
            helperText={formik.touched.comment && formik.errors.comment}
            multiline
            rows={4}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button
          type="submit"
          disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}
        >
          {formik.isSubmitting ? <CircularProgress size={24} /> : "Add Review"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default AddReviewModal;
