import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

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
  const onSubmit = (values) => console.log(values);

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
        Create an account to continue shopping with us 🛒
      </Typography>

      {/* form */}
      <Stack component="form" onSubmit={formik.handleSubmit} gap={2}>
        {/* name fields */}
        <Stack direction="row" gap={2}>
          <TextField
            fullWidth
            required
            id="firstName"
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
            id="lastName"
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
          id="email"
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
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              required
              id="password"
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
            <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
            <OutlinedInput
              required
              id="confirmPassword"
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
          id="phone"
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
          <FormLabel required id="gender">
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
              control={<Radio size="small" />}
              label="Male"
            />
            <FormControlLabel
              value="f"
              control={<Radio size="small" />}
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
          {formik.isSubmitting ? "Submitting..." : "Submit"}
        </Button>

        {/* login link */}
        <Typography variant="body2" textAlign="center" mt={2}>
          Already have an account?{" "}
          <Link component={NavLink} to="/login" underline="hover">
            Login
          </Link>
        </Typography>
      </Stack>
    </Container>
  );
};
export default Register;
