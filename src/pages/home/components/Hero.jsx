import { useNavigate } from "react-router-dom";
import {
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { KeyboardArrowRightRounded } from "@mui/icons-material";

import bgImg from "../../../assets/hero-bg.jpg";

const Hero = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Stack
      component="header"
      gap={4}
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      p={2}
      sx={{
        minHeight: { xs: "calc(100lvh - 56px)", sm: "calc(100lvh - 64px)" },
        color: "#fff",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "bottom",
      }}
    >
      <Typography
        component="h2"
        fontWeight={500}
        variant={isMobile ? "h2" : "h1"}
      >
        Welcome to Nile
      </Typography>
      <Typography
        component="p"
        fontWeight={500}
        variant={isMobile ? "h6" : "h5"}
      >
        The best place to buy stuff online
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        endIcon={<KeyboardArrowRightRounded />}
        onClick={() => {
          navigate("/products/page/1");
        }}
      >
        Shop Now
      </Button>
    </Stack>
  );
};

export default Hero;
