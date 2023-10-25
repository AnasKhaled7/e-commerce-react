import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  // formik validation schema
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .required("Required")
      .min(6, "Password must be at least 6 characters long")
      .max(30, "Password must be at most 30 characters long"),
  });

  // formik submit handler
  const onSubmit = (values) => console.log(values);

  // formik hook for form handling
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit,
  });

  // password visibility handler
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        my: 4,
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      {/* heading */}
      <Typography variant="h4" component="h2" textAlign="center">
        Welcome Back!
        <br />
        Login to your account 👋
      </Typography>

      {/* form */}
      <Stack component="form" onSubmit={formik.handleSubmit} gap={2}>
        {/* email field */}
        <TextField
          fullWidth
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
          fullWidth
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
          fullWidth
          type="submit"
          variant="contained"
          size="large"
          disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}
        >
          {formik.isSubmitting ? "Submitting..." : "Submit"}
        </Button>

        {/* register link */}
        <Typography variant="body2" textAlign="center" mt={2}>
          Don't have an account?{" "}
          <Link component={NavLink} to="/register" underline="hover">
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
    </Container>
  );
};
export default Login;
