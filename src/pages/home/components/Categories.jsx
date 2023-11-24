import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  Paper,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { KeyboardArrowRightRounded } from "@mui/icons-material";

import { useGetCategoriesQuery } from "../../../slices/categories.api.slice";
import { Message } from "../../../components";

const CategoryItem = ({ item }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Paper
      variant="outlined"
      sx={{ position: "relative", height: "60vh", minHeight: 300 }}
    >
      <img
        src={item?.image?.url}
        alt={item?.name}
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
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
            navigate(`/products/category/${item._id}`);
          }}
        >
          Shop Now
        </Button>
      </Stack>
    </Paper>
  );
};

const Categories = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { data, isLoading, error } = useGetCategoriesQuery();

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
      }}
    >
      <Typography
        component="h2"
        variant={isMobile ? "h4" : "h3"}
        fontWeight={700}
        textAlign="center"
      >
        Top Categories
      </Typography>

      <Grid container spacing={2}>
        {isLoading ? (
          <>
            {[1, 2, 3, 4].map((index) => (
              <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                <Skeleton variant="rounded" height={300} />
              </Grid>
            ))}
          </>
        ) : error ? (
          <Message severity="error">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <>
            {data?.categories.map((category) => (
              <Grid key={category._id} item xs={12} sm={6} md={4} lg={3}>
                <CategoryItem item={category} />
              </Grid>
            ))}
          </>
        )}
      </Grid>

      <Button
        variant="outlined"
        size="large"
        endIcon={<KeyboardArrowRightRounded />}
      >
        View all categories
      </Button>
    </Container>
  );
};
export default Categories;
