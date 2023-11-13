import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

import { CheckoutSteps, FormSection } from "../../components";
import { savePaymentMethod } from "../../slices/cart.slice";

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingAddress, paymentMethod } = useSelector((state) => state.cart);

  useEffect(() => {
    if (!shippingAddress.address) navigate("/shipping");
  }, [shippingAddress, navigate]);

  // formik validation schema
  const validationSchema = Yup.object({
    method: Yup.string().required("Required"),
  });

  // formik submit handler
  const onSubmit = (values) => {
    dispatch(savePaymentMethod(values.method));
    navigate("/place-order");
  };

  // formik hook for form handling
  const formik = useFormik({
    initialValues: {
      method: paymentMethod || "",
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
          Payment Method 💳
        </Typography>

        {/* gender field */}
        <FormControl
          error={formik.touched.method && Boolean(formik.errors.method)}
        >
          <FormLabel required id="payment-method">
            Select Method
          </FormLabel>
          <RadioGroup
            aria-labelledby="payment-method"
            name="method"
            value={formik.values.method}
            onChange={formik.handleChange}
          >
            <FormControlLabel
              value="PayPal"
              control={<Radio size="small" />}
              label="PayPal"
            />
            <FormControlLabel
              value="COD"
              control={<Radio size="small" />}
              label="Cash On Delivery"
            />
          </RadioGroup>
          <FormHelperText>
            {formik.touched.gender && formik.errors.gender}
          </FormHelperText>
        </FormControl>

        {/* submit button */}
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={!formik.isValid || formik.isSubmitting}
          sx={{ my: 2 }}
        >
          {formik.isSubmitting ? <CircularProgress size={24} /> : "Continue"}
        </Button>

        {/* checkout steps */}
        <CheckoutSteps activeStep={2} />
      </Paper>
    </FormSection>
  );
};
export default Payment;
