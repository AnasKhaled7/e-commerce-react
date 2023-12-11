import { useNavigate } from "react-router-dom";
import {
  Button,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { KeyboardArrowRightRounded } from "@mui/icons-material";

const CategoryCard = ({ item }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Paper
      variant="outlined"
      sx={{ position: "relative", height: "50vh", minHeight: 300 }}
    >
      <img
        src={item?.image}
        alt={item?.name}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />

      <Stack
        bgcolor="rgba(0,0,0,0.55)"
        position="absolute"
        alignItems="center"
        justifyContent="center"
        gap={4}
        sx={{ inset: 0 }}
      >
        <Typography
          component="h3"
          variant={isMobile ? "h6" : "h5"}
          color="#fff"
        >
          {item?.name}
        </Typography>
        <Button
          variant="contained"
          endIcon={<KeyboardArrowRightRounded />}
          onClick={() => {
            navigate(`/products/category/${item._id}/page/1`);
          }}
        >
          Shop Now
        </Button>
      </Stack>
    </Paper>
  );
};

export default CategoryCard;
