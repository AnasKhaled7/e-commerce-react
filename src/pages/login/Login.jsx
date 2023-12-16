import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { useFormik } from "formik";
import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { FormSection } from "../../components";
import { useLoginMutation } from "../../slices/users.api.slice";
import { setCredentials } from "../../slices/auth.slice";
import { useSnackbar } from "../../hooks/useSnackbar";
import { loginValidation } from "./../../utils/customer.validation";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [showSnackbar, hideSnackbar, SnackbarComponent] = useSnackbar();

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) navigate(redirect);
  }, [userInfo, redirect, navigate]);

  // formik submit handler
  const onSubmit = async (values) => {
    hideSnackbar();
    try {
      const res = await login(values).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (error) {
      console.log(error);
      showSnackbar(error?.data?.message, "error");
    }
  };

  // formik hook for form handling
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginValidation,
    onSubmit,
  });

  // password visibility handler
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (e) => e.preventDefault();

  return (
    <FormSection>
      <Helmet>
        <title>Login | Nile</title>
      </Helmet>
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
          Welcome Back!
        </Typography>

        {/* email field */}
        <TextField
          required
          id="login-email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          autoComplete="email"
        />

        {/* password field */}
        <FormControl
          error={formik.touched.password && Boolean(formik.errors.password)}
        >
          <InputLabel htmlFor="login-password">Password</InputLabel>
          <OutlinedInput
            required
            id="login-password"
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
            autoComplete="current-password"
          />
          <FormHelperText>
            {formik.touched.password && formik.errors.password}
          </FormHelperText>
        </FormControl>

        {/* submit button */}
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}
        >
          {formik.isSubmitting ? <CircularProgress size={24} /> : "Login"}
        </Button>

        <Stack gap={2}>
          {/* register link */}
          <Typography variant="body2" textAlign="center">
            New customer?{" "}
            <Link
              component={NavLink}
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
              underline="hover"
            >
              Register
            </Link>
          </Typography>

          {/* forgot password link */}
          <Typography variant="body2" textAlign="center">
            Forgot password?{" "}
            <Link component={NavLink} to="/reset-password" underline="hover">
              Reset password
            </Link>
          </Typography>
        </Stack>
      </Paper>

      {SnackbarComponent}
    </FormSection>
  );
};
export default Login;
