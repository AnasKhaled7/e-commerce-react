import { useNavigate } from "react-router-dom";
import { Button, Paper, Stack } from "@mui/material";
import { KeyboardArrowRightRounded } from "@mui/icons-material";

const CategoryCard = ({ item }) => {
  const navigate = useNavigate();

  return (
    <Paper
      variant="outlined"
      sx={{ position: "relative", height: "40vh", minHeight: 200 }}
    >
      <img
        src={item?.image}
        alt={item?.name}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />

      <Stack
        bgcolor="rgba(0,0,0,0.5)"
        position="absolute"
        alignItems="center"
        justifyContent="center"
        sx={{ inset: 0 }}
      >
        <Button
          variant="contained"
          endIcon={<KeyboardArrowRightRounded />}
          onClick={() => {
            navigate(`/products/category/${item._id}/page/1`);
          }}
        >
          {item?.name}
        </Button>
      </Stack>
    </Paper>
  );
};

export default CategoryCard;
