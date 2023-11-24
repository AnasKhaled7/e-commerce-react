import {
  Container,
  Grid,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { Message } from "../../../components";
import { useGetBrandsQuery } from "../../../slices/brands.api.slice";

const Brands = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { data, isLoading, error } = useGetBrandsQuery();

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
        Brands
      </Typography>

      <Grid container spacing={2}>
        {isLoading ? (
          <>
            {[1, 2, 3, 4].map((index) => (
              <Grid key={index} item xs={6} sm={4} md={3} lg={2}>
                <Skeleton variant="rounded" height={100} />
              </Grid>
            ))}
          </>
        ) : error ? (
          <Message severity="error">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <>
            {data?.brands.map((brand) => (
              <Grid key={brand._id} item xs={6} sm={4} md={3} lg={2}>
                <img
                  src={brand?.image?.url}
                  alt={brand?.name}
                  style={{
                    width: "100%",
                    height: "100px",
                    objectFit: "contain",
                  }}
                />
              </Grid>
            ))}
          </>
        )}
      </Grid>
    </Container>
  );
};
export default Brands;
