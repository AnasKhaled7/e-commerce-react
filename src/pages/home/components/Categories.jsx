import {
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import category1 from "../../../assets/category-1.jpg";
import category2 from "../../../assets/category-2.jpg";
import category3 from "../../../assets/category-3.jpg";

const categories = [
  {
    img: category1,
    title: "SHIRT STYLE!",
  },
  {
    img: category2,
    title: "LOUNGEWEAR LOVE",
  },
  {
    img: category3,
    title: "LIGHT JACKETS",
  },
];

const CategoryItem = ({ item }) => {
  return (
    <Paper variant="outlined" sx={{ position: "relative", height: "70vh" }}>
      <img
        src={item.img}
        alt={item.title}
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
        <Typography component="h3" variant="h5" color="#fff">
          {item.title}
        </Typography>
        <Button variant="contained" endIcon={<KeyboardArrowRightRoundedIcon />}>
          Shop Now
        </Button>
      </Stack>
    </Paper>
  );
};

const Categories = () => {
  return (
    <Container
      maxWidth="xl"
      sx={{
        my: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
      }}
    >
      <Typography component="h2" variant="h3" fontWeight={700}>
        Top Categories
      </Typography>

      <Grid container spacing={2}>
        {categories.map((item, index) => (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <CategoryItem item={item} />
          </Grid>
        ))}
      </Grid>

      <Button
        variant="outlined"
        size="large"
        endIcon={<KeyboardArrowRightRoundedIcon />}
      >
        View all categories
      </Button>
    </Container>
  );
};
export default Categories;
