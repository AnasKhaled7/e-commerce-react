import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { useResetPasswordMutation } from "../../../slices/users.api.slice";
import { useSnackbar } from "../../../hooks/useSnackbar";
import { resetPasswordValidation } from "../../../utils/customer.validation";

const ResetPasswordModal = ({ open, handleClose }) => {
  const navigate = useNavigate();
  const [showSnackbar, hideSnackbar, SnackbarComponent] = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [resetPassword] = useResetPasswordMutation();

  // formik submit handler
  const onSubmit = async (values) => {
    hideSnackbar();
    try {
      await resetPassword(values).unwrap();
      localStorage.removeItem("email");
      formik.resetForm();
      navigate("/login");
    } catch (error) {
      showSnackbar(error?.data?.message, "error");
    }
  };

  // formik hook
  const formik = useFormik({
    initialValues: {
      code: "",
      password: "",
      confirmPassword: "",
      email: localStorage.getItem("email"),
    },
    validationSchema: resetPasswordValidation,
    onSubmit,
  });

  // password visibility handler
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (e) => e.preventDefault();

  return (
    <Dialog
      component="form"
      onSubmit={formik.handleSubmit}
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Reset your password</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <DialogContentText>
          Please enter the code and your new password below.
        </DialogContentText>

        <Stack gap={3}>
          {/* code field */}
          <TextField
            required
            id="reset-code"
            name="code"
            label="Code"
            value={formik.values.code}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.code && Boolean(formik.errors.code)}
            helperText={formik.touched.code && formik.errors.code}
            autoComplete="off"
          />

          {/* password fields */}
          <Stack direction="row" gap={2}>
            <FormControl
              error={formik.touched.password && Boolean(formik.errors.password)}
            >
              <InputLabel htmlFor="reset-password">Password</InputLabel>
              <OutlinedInput
                required
                id="reset-password"
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="new-password"
              />
              <FormHelperText>
                {formik.touched.password && formik.errors.password}
              </FormHelperText>
            </FormControl>

            <FormControl
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
            >
              <InputLabel htmlFor="reset-confirmPassword">Confirm</InputLabel>
              <OutlinedInput
                required
                id="reset-confirmPassword"
                name="confirmPassword"
                label="Confirm"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="new-password"
              />
              <FormHelperText>
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword}
              </FormHelperText>
            </FormControl>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}
        >
          {formik.isSubmitting ? (
            <CircularProgress size={24} />
          ) : (
            "Change Password"
          )}
        </Button>
      </DialogActions>

      <SnackbarComponent />
    </Dialog>
  );
};
export default ResetPasswordModal;
