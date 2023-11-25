import { useState } from "react";
import {
  Box,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  ArrowBackIosRounded,
  ArrowForwardIosRounded,
} from "@mui/icons-material";

import slide1 from "../../../assets/slide-1.png";
import slide2 from "../../../assets/slide-2.png";
import slide3 from "../../../assets/slide-3.png";

const sliderItems = [
  {
    img: slide1,
    title: "SUMMER SALE",
    desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
    bg: "f5fafd",
  },
  {
    img: slide2,
    title: "SUMMER SALE",
    desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
    bg: "fcf1ed",
  },
  {
    img: slide3,
    title: "SUMMER SALE",
    desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
    bg: "fbf0f4",
  },
];

const Dots = ({ activeSlide, handleClick }) => {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      gap={1}
      sx={{
        mt: 2,
        position: "absolute",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      {sliderItems.map((_, index) => (
        <Box
          key={index}
          sx={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            bgcolor: activeSlide === index ? "primary.main" : "grey.500",
            cursor: "pointer",
          }}
          onClick={() => handleClick(index)}
        />
      ))}
    </Stack>
  );
};

const Slider = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [activeSlide, setActiveSlide] = useState(0);

  const handlePrevSlide = () => {
    setActiveSlide((prevSlide) =>
      prevSlide === 0 ? sliderItems.length - 1 : prevSlide - 1
    );
  };

  const handleNextSlide = () => {
    setActiveSlide((prevSlide) =>
      prevSlide === sliderItems.length - 1 ? 0 : prevSlide + 1
    );
  };

  const handleDotClick = (index) => setActiveSlide(index);

  return (
    <Stack direction="row" sx={{ position: "relative", overflow: "hidden" }}>
      {/* left arrow */}
      <IconButton
        aria-label="previous"
        sx={{
          position: "absolute",
          zIndex: 1,
          top: "50%",
          left: "5px",
          transform: "translateY(-50%)",
        }}
        onClick={handlePrevSlide}
      >
        <ArrowBackIosRounded
          sx={{ fontSize: { xs: "2.5rem", md: "3.5rem" } }}
        />
      </IconButton>

      {/* slides wrapper */}
      <Stack direction="row" height="100%" sx={{ flexGrow: 1, flexShrink: 0 }}>
        {/* slides */}
        {sliderItems.map((item, index) => (
          <Stack
            key={index}
            bgcolor={`#${item.bg}`}
            sx={{
              width: "100vw",
              height: { xs: "calc(100vh - 56px)", sm: "calc(100vh - 64px)" },
              minHeight: "550px",
              transform: `translateX(-${activeSlide * 100}%)`,
              transition: "transform 0.8s ease",
            }}
          >
            {/* img  */}
            <Box height="50%">
              <img
                src={item.img}
                alt={item.title}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </Box>

            {/* info container */}
            <Stack
              height="50%"
              alignItems="center"
              justifyContent="center"
              sx={{ bgcolor: "#fff", textAlign: "center" }}
            >
              <Typography variant={isMobile ? "h4" : "h3"} fontWeight={700}>
                {item.title}
              </Typography>

              <Typography variant="body2" letterSpacing="3px" my={4}>
                {item.desc}
              </Typography>

              {/* <Button
                variant="contained"
                size="large"
                endIcon={<KeyboardArrowRightRounded />}
              >
                Shop Now
              </Button> */}
            </Stack>
          </Stack>
        ))}
      </Stack>

      {/* right arrow */}
      <IconButton
        aria-label="next"
        sx={{
          position: "absolute",
          top: "50%",
          right: "5px",
          transform: "translateY(-50%)",
        }}
        onClick={handleNextSlide}
      >
        <ArrowForwardIosRounded
          sx={{ fontSize: { xs: "2.5rem", md: "3.5rem" } }}
        />
      </IconButton>

      {/* dots */}
      <Dots activeSlide={activeSlide} handleClick={handleDotClick} />
    </Stack>
  );
};

export default Slider;
