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
      gap={4}
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      px={2}
      sx={{
        height: { xs: "calc(100vh - 56px)", sm: "calc(100vh - 64px)" },
        minHeight: 400,
        color: "#fff",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "bottom",
      }}
    >
      <Typography component="h1" variant={isMobile ? "h3" : "h1"}>
        Welcome to Nile
      </Typography>
      <Typography component="h2" variant={isMobile ? "h6" : "h5"}>
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
