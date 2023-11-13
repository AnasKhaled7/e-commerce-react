import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
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
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { FormSection } from "../../components";
import { useLoginMutation } from "../../slices/users.api.slice";
import { setCredentials } from "../../slices/auth.slice";
import { useSnackbar } from "../../hooks/useSnackbar";

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

  // formik validation schema
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .required("Required")
      .min(6, "Password must be at least 6 characters long")
      .max(30, "Password must be at most 30 characters long"),
  });

  // formik submit handler
  const onSubmit = async (values) => {
    hideSnackbar();
    try {
      const res = await login(values).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (error) {
      showSnackbar(error?.data?.message || error.error, "error");
    }
  };

  // formik hook for form handling
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit,
  });

  // password visibility handler
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  return (
    <FormSection>
      {/* form */}
      <Paper
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          p: { xs: 2, sm: 4 },
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {/* heading */}
        <Typography variant="h4" component="h2" textAlign="center" mb={4}>
          Welcome Back!
          <br />
          Login to your account 👋
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
          {formik.isSubmitting ? <CircularProgress size={24} /> : "Submit"}
        </Button>

        {/* register link */}
        <Typography variant="body2" textAlign="center" mt={2}>
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
      </Paper>

      <SnackbarComponent />
    </FormSection>
  );
};
export default Login;
