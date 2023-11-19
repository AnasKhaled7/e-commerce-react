import {
  Step,
  StepLabel,
  Stepper,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const steps = ["Sign In", "Shipping", "Place Order"];

const CheckoutSteps = ({ activeStep }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Stepper
      activeStep={activeStep}
      orientation={isMobile ? "vertical" : "horizontal"}
    >
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default CheckoutSteps;
