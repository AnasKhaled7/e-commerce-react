import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  CircularProgress,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { FormSection } from "../../components";
import { useSendResetPasswordEmailMutation } from "../../slices/users.api.slice";
import { useSnackbar } from "../../hooks/useSnackbar";
import { ResetPasswordModal } from "./components";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [sendResetPasswordEmail] = useSendResetPasswordEmailMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const [showSnackbar, hideSnackbar, SnackbarComponent] = useSnackbar();

  useEffect(() => {
    if (userInfo?._id) navigate("/");
  }, [userInfo, navigate]);

  // formik validation schema
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
  });

  // formik submit handler
  const onSubmit = async (values) => {
    hideSnackbar();
    try {
      await sendResetPasswordEmail(values).unwrap();
      showSnackbar("Password reset email sent successfully", "success");
      localStorage.setItem("email", values.email);
      setOpen(true);
    } catch (error) {
      showSnackbar(error?.data?.message || error.error, "error");
    }
  };

  // formik hook for form handling
  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema,
    onSubmit,
  });

  // modal
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  return (
    <FormSection>
      {/* form */}
      <Paper
        component="form"
        variant="outlined"
        onSubmit={formik.handleSubmit}
        sx={{
          p: { xs: 3, sm: 5 },
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        {/* heading */}
        <Typography
          variant="h5"
          component="h2"
          textAlign="center"
          fontWeight={500}
        >
          Reset Password
        </Typography>

        {/* description */}
        <Typography textAlign="center" color="text.secondary">
          Enter your email and we will send you a code to reset your password.
        </Typography>

        {/* email field */}
        <TextField
          required
          id="reset-password-email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          autoComplete="email"
        />

        {/* submit button */}
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}
        >
          {formik.isSubmitting ? <CircularProgress size={24} /> : "Send Code"}
        </Button>

        <Link
          component={NavLink}
          to="/login"
          color="error"
          textAlign="center"
          underline="none"
        >
          Cancel
        </Link>
      </Paper>

      <ResetPasswordModal open={open} handleClose={handleClose} />

      <SnackbarComponent />
    </FormSection>
  );
};
export default ResetPassword;
