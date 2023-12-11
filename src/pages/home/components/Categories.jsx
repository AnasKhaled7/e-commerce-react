import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { KeyboardArrowRightRounded } from "@mui/icons-material";

import { useGetCategoriesQuery } from "../../../slices/categories.api.slice";
import { CategoryCard, Message } from "../../../components";

const Categories = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { data, isLoading, error } = useGetCategoriesQuery({ limit: 4 });

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
        Categories
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
          <Grid item xs={12}>
            <Message severity="error">{error?.data?.message}</Message>
          </Grid>
        ) : (
          <>
            {data?.categories.map((category) => (
              <Grid key={category._id} item xs={12} sm={6} md={4} lg={3}>
                <CategoryCard item={category} />
              </Grid>
            ))}
          </>
        )}
      </Grid>

      <Button
        variant="outlined"
        size="large"
        endIcon={<KeyboardArrowRightRounded />}
        onClick={() => navigate("/categories/page/1")}
      >
        View all categories
      </Button>
    </Container>
  );
};
export default Categories;
