import { useState } from "react";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
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

  const handleDotClick = (index) => {
    setActiveSlide(index);
  };

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
        <ArrowBackIosRoundedIcon
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
            direction="row"
            alignItems="center"
            gap={1}
            sx={{
              width: "100vw",
              height: { xs: "auto", md: "calc(100vh - 64px)" },
              minHeight: "500px",
              px: { xs: 3, md: 6 },
              transform: `translateX(-${activeSlide * 100}%)`,
              transition: "transform 0.8s ease",
            }}
          >
            {/* img container */}
            <Box
              sx={{
                flex: { md: 1 },
                display: { xs: "none", md: "flex" },
                justifyContent: { md: "center" },
              }}
            >
              <img src={item.img} alt={item.title} />
            </Box>

            {/* info container */}
            <Box flex={1.5} sx={{ textAlign: { xs: "center", md: "initial" } }}>
              <Typography component="h2" variant="h3" fontWeight={700}>
                {item.title}
              </Typography>

              <Typography
                variant="body2"
                fontWeight={500}
                letterSpacing="3px"
                my={4}
              >
                {item.desc}
              </Typography>

              <Button
                variant="contained"
                size="large"
                endIcon={<KeyboardArrowRightRoundedIcon />}
              >
                Shop Now
              </Button>
            </Box>
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
        <ArrowForwardIosRoundedIcon
          sx={{ fontSize: { xs: "2.5rem", md: "3.5rem" } }}
        />
      </IconButton>

      {/* dots */}
      <Dots activeSlide={activeSlide} handleClick={handleDotClick} />
    </Stack>
  );
};

export default Slider;
