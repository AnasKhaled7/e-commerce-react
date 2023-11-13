import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { FormSection } from "../../components";
import { useRegisterMutation } from "../../slices/users.api.slice";
import { setCredentials } from "../../slices/auth.slice";
import { useSnackbar } from "../../hooks/useSnackbar";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register] = useRegisterMutation();
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
    firstName: Yup.string()
      .min(3, "First Name must be at least 3 characters long")
      .max(30, "First Name must be at most 30 characters long")
      .required("Required"),
    lastName: Yup.string()
      .min(3, "Last Name must be at least 3 characters long")
      .max(30, "Last Name must be at most 30 characters long")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .required("Required")
      .min(6, "Password must be at least 6 characters long")
      .max(30, "Password must be at most 30 characters long"),
    confirmPassword: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    gender: Yup.string().required("Required"),
    phone: Yup.string()
      .required("Required")
      .matches(/^01[0-2,5]{1}[0-9]{8}$/, "Invalid phone number"),
  });

  // formik submit handler
  const onSubmit = async (values) => {
    hideSnackbar();
    try {
      const res = await register(values).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (error) {
      showSnackbar(error?.data?.message || error.error, "error");
    }
  };

  // formik hook for form handling and validation schema and submit handler as props to the hook function
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "",
      phone: "",
    },
    validationSchema,
    onSubmit,
  });

  // password visibility handler
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
          Create an account to continue shopping with us 🛒
        </Typography>

        {/* name fields */}
        <Stack direction="row" gap={2}>
          <TextField
            fullWidth
            required
            id="register-firstName"
            name="firstName"
            label="First Name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />

          <TextField
            fullWidth
            required
            id="register-lastName"
            name="lastName"
            label="Last Name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
        </Stack>

        {/* email field */}
        <TextField
          fullWidth
          required
          id="register-email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          autoComplete="email"
        />

        {/* password fields */}
        <Stack direction="row" gap={2}>
          <FormControl
            fullWidth
            error={formik.touched.password && Boolean(formik.errors.password)}
          >
            <InputLabel htmlFor="register-password">Password</InputLabel>
            <OutlinedInput
              required
              id="register-password"
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
            fullWidth
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
          >
            <InputLabel htmlFor="register-confirmPassword">
              Confirm Password
            </InputLabel>
            <OutlinedInput
              required
              id="register-confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
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
              {formik.touched.confirmPassword && formik.errors.confirmPassword}
            </FormHelperText>
          </FormControl>
        </Stack>

        {/* phone field */}
        <TextField
          fullWidth
          required
          id="register-phone"
          name="phone"
          label="Phone"
          type="tel"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
          autoComplete="tel"
        />

        {/* gender field */}
        <FormControl
          error={formik.touched.gender && Boolean(formik.errors.gender)}
        >
          <FormLabel required id="register-gender">
            Gender
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="gender"
            name="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
          >
            <FormControlLabel
              value="m"
              control={
                <Radio
                  size="small"
                  inputProps={{
                    "aria-label": "Male",
                  }}
                />
              }
              label="Male"
            />
            <FormControlLabel
              value="f"
              control={
                <Radio
                  size="small"
                  inputProps={{
                    "aria-label": "Female",
                  }}
                />
              }
              label="Female"
            />
          </RadioGroup>
          <FormHelperText>
            {formik.touched.gender && formik.errors.gender}
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
          {formik.isSubmitting ? (
            <CircularProgress color="inherit" size="1.6rem" />
          ) : (
            "Submit"
          )}
        </Button>

        {/* login link */}
        <Typography variant="body2" textAlign="center" mt={2}>
          Already have an account?{" "}
          <Link
            component={NavLink}
            to={redirect ? `/login?redirect=${redirect}` : "/login"}
            underline="hover"
          >
            Login
          </Link>
        </Typography>
      </Paper>

      <SnackbarComponent />
    </FormSection>
  );
};
export default Register;
