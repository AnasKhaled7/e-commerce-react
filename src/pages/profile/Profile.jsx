import { useEffect, useState } from "react";
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
  OutlinedInput,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { FormSection } from "../../components";
import { useUpdateProfileMutation } from "../../slices/users.api.slice";
import { setCredentials } from "../../slices/auth.slice";
import { useSnackbar } from "../../hooks/useSnackbar";

const Profile = () => {
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [showSnackbar, hideSnackbar, SnackbarComponent] = useSnackbar();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile] = useUpdateProfileMutation();

  // formik validation schema
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(3, "First Name must be at least 3 characters long")
      .max(30, "First Name must be at most 30 characters long"),
    lastName: Yup.string()
      .min(3, "Last Name must be at least 3 characters long")
      .max(30, "Last Name must be at most 30 characters long"),
    email: Yup.string().email("Invalid email address"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .max(30, "Password must be at most 30 characters long"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
    address: Yup.string(),
    city: Yup.string(),
    postalCode: Yup.string(),
    phone: Yup.string().matches(
      /^01[0-2,5]{1}[0-9]{8}$/,
      "Invalid phone number"
    ),
  });

  // formik submit handler
  const onSubmit = async (values) => {
    hideSnackbar();
    try {
      const changedValues = {};
      for (const key in values) {
        if (values[key] !== formik.initialValues[key]) {
          changedValues[key] = values[key];
        }
      }

      const res = await updateProfile(changedValues).unwrap();
      dispatch(setCredentials({ ...res }));
      showSnackbar("Profile updated successfully", "success");
    } catch (error) {
      console.log(error);
      showSnackbar(error?.data?.message || error.error, "error");
    }
  };

  // formik hook
  const formik = useFormik({
    initialValues: {
      firstName: userInfo?.firstName || "",
      lastName: userInfo?.lastName || "",
      email: userInfo?.email || "",
      password: "",
      confirmPassword: "",
      address: userInfo?.shippingAddress?.address || "",
      city: userInfo?.shippingAddress?.city || "",
      postalCode: userInfo?.shippingAddress?.postalCode || "",
      phone: userInfo?.phone || "",
    },
    validationSchema,
    onSubmit,
  });

  useEffect(() => {
    formik.resetForm({
      values: {
        firstName: userInfo?.firstName || "",
        lastName: userInfo?.lastName || "",
        email: userInfo?.email || "",
        password: "",
        confirmPassword: "",
        address: userInfo?.shippingAddress?.address || "",
        city: userInfo?.shippingAddress?.city || "",
        postalCode: userInfo?.shippingAddress?.postalCode || "",
        phone: userInfo?.phone || "",
      },
    });

    // eslint-disable-next-line
  }, [userInfo]);

  // password visibility handler
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (e) => e.preventDefault();

  return (
    <FormSection>
      {/* form */}
      <Paper
        variant="outlined"
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
          User Profile
        </Typography>

        {/* name fields */}
        <Stack direction="row" gap={2}>
          <TextField
            fullWidth
            id="profile-firstName"
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
            id="profile-lastName"
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
          id="profile-email"
          name="email"
          label="Email"
          type="email"
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
            error={formik.touched.password && Boolean(formik.errors.password)}
          >
            <InputLabel htmlFor="profile-password">Password</InputLabel>
            <OutlinedInput
              id="profile-password"
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
            <InputLabel htmlFor="profile-confirmPassword">
              Confirm Password
            </InputLabel>
            <OutlinedInput
              id="profile-confirmPassword"
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

        {/* address */}
        <TextField
          id="profile-address"
          name="address"
          label="Address"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.address && Boolean(formik.errors.address)}
          helperText={formik.touched.address && formik.errors.address}
          autoComplete="street-address"
        />

        {/* city */}
        <TextField
          id="profile-city"
          name="city"
          label="City"
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.city && Boolean(formik.errors.city)}
          helperText={formik.touched.city && formik.errors.city}
          autoComplete="address-level2"
        />

        {/* postal code */}
        <TextField
          id="profile-postalCode"
          name="postalCode"
          label="Postal Code"
          value={formik.values.postalCode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.postalCode && Boolean(formik.errors.postalCode)}
          helperText={formik.touched.postalCode && formik.errors.postalCode}
          autoComplete="postal-code"
        />

        {/* phone */}
        <TextField
          id="profile-phone"
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

        {/* submit button */}
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}
          sx={{ mt: 2 }}
        >
          {formik.isSubmitting ? <CircularProgress size={24} /> : "Update"}
        </Button>
      </Paper>

      <SnackbarComponent />
    </FormSection>
  );
};

export default Profile;
