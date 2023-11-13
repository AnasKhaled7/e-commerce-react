import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { CheckoutSteps, FormSection } from "../../components";
import { saveShippingAddress } from "../../slices/cart.slice";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingAddress } = useSelector((state) => state.cart);

  // formik validation schema
  const validationSchema = Yup.object({
    address: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    postalCode: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
  });

  // formik submit handler
  const onSubmit = (values) => {
    dispatch(saveShippingAddress(values));
    navigate("/payment");
  };

  // formik hook for form handling
  const formik = useFormik({
    initialValues: {
      address: shippingAddress?.address || "",
      city: shippingAddress?.city || "",
      postalCode: shippingAddress?.postalCode || "",
      country: shippingAddress?.country || "",
    },
    validationSchema,
    onSubmit,
  });
  return (
    <FormSection>
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

        {/* country */}
        <TextField
          id="shipping-country"
          name="country"
          label="Country"
          value={formik.values.country}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.country && Boolean(formik.errors.country)}
          helperText={formik.touched.country && formik.errors.country}
          required
          autoComplete="country"
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
    </FormSection>
  );
};
export default Shipping;
