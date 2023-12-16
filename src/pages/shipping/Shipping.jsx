import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { useFormik } from "formik";
import {
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { CheckoutSteps, FormSection } from "../../components";
import { useUpdateProfileMutation } from "../../slices/users.api.slice";
import { useSnackbar } from "../../hooks/useSnackbar";
import { updateUserInfo } from "../../slices/auth.slice";
import { shippingValidation } from "../../utils/customer.validation";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showSnackbar, hideSnackbar, SnackbarComponent] = useSnackbar();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile] = useUpdateProfileMutation();

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
      if (Object.keys(changedValues).length === 0) {
        navigate("/place-order");
        return;
      }
      const res = await updateProfile(changedValues).unwrap();
      dispatch(updateUserInfo({ ...res }));
      navigate("/place-order");
    } catch (error) {
      console.log(error);
      showSnackbar(error?.data?.message, "error");
    }
  };

  // formik hook for form handling
  const formik = useFormik({
    initialValues: {
      address: userInfo?.shippingAddress?.address || "",
      city: userInfo?.shippingAddress?.city || "",
      postalCode: userInfo?.shippingAddress?.postalCode || "",
      phone: userInfo?.phone || "",
    },
    validationSchema: shippingValidation,
    onSubmit,
    enableReinitialize: true,
  });

  return (
    <FormSection>
      <Helmet>
        <title>Shipping | Nile</title>
      </Helmet>
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
          Shipping Address 🚚
        </Typography>

        {/* address */}
        <TextField
          id="shipping-address"
          name="address"
          label="Address"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.address && Boolean(formik.errors.address)}
          helperText={formik.touched.address && formik.errors.address}
          required
          autoComplete="street-address"
        />

        {/* city */}
        <TextField
          id="shipping-city"
          name="city"
          label="City"
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.city && Boolean(formik.errors.city)}
          helperText={formik.touched.city && formik.errors.city}
          required
          autoComplete="address-level2"
        />

        {/* postal code */}
        <TextField
          id="shipping-postalCode"
          name="postalCode"
          label="Postal Code"
          value={formik.values.postalCode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.postalCode && Boolean(formik.errors.postalCode)}
          helperText={formik.touched.postalCode && formik.errors.postalCode}
          required
          autoComplete="postal-code"
        />

        {/* phone */}
        <TextField
          id="shipping-phone"
          name="phone"
          label="Phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
          required
          autoComplete="tel"
        />

        {/* submit button */}
        <Button
          fullWidth
          type="submit"
          variant="contained"
          size="large"
          disabled={!formik.isValid || formik.isSubmitting}
          sx={{ my: 2 }}
        >
          {formik.isSubmitting ? <CircularProgress size={24} /> : "Continue"}
        </Button>

        {/* checkout steps */}
        <CheckoutSteps activeStep={1} />
      </Paper>

      {/* snackbar */}
      {SnackbarComponent}
    </FormSection>
  );
};
export default Shipping;
