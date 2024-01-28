import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { useFormik } from "formik";
import {
  Button,
  CircularProgress,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { FormSection, PageHeader } from "../../components";
import { useSendResetPasswordEmailMutation } from "../../slices/users.api.slice";
import { useSnackbar } from "../../hooks/useSnackbar";
import { ResetPasswordModal } from "./components";
import { emailValidation } from "../../utils/customer.validation";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [sendResetPasswordEmail] = useSendResetPasswordEmailMutation();
  const { decodedToken } = useSelector((state) => state.auth);

  const [showSnackbar, hideSnackbar, SnackbarComponent] = useSnackbar();

  useEffect(() => {
    if (decodedToken?._id) navigate("/");
  }, [decodedToken, navigate]);

  // formik submit handler
  const onSubmit = async (values) => {
    hideSnackbar();
    try {
      const res = await sendResetPasswordEmail(values).unwrap();
      showSnackbar(res?.message, "success");
      localStorage.setItem("email", values.email);
      setOpen(true);
    } catch (error) {
      console.log(error);
      showSnackbar(error?.data?.message, "error");
    }
  };

  // formik hook for form handling
  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: emailValidation,
    onSubmit,
  });

  // modal
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  return (
    <FormSection>
      <Helmet>
        <title>Reset Password | Nile</title>
      </Helmet>
      <Paper
        component="form"
        variant="outlined"
        onSubmit={formik.handleSubmit}
        sx={{
          p: { xs: 3, sm: 5 },
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <PageHeader text="Reset Password" />

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

      {SnackbarComponent}
    </FormSection>
  );
};
export default ResetPassword;
