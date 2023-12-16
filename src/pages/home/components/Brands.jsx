import { Container, Grid, Skeleton, Typography } from "@mui/material";

import { Message } from "../../../components";
import { useGetBrandsQuery } from "../../../slices/brands.api.slice";

const Brands = () => {
  const { data, isLoading, error } = useGetBrandsQuery();

  return (
    <Container
      maxWidth="xl"
      component="section"
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
      }}
    >
      <Typography variant="h3" fontWeight={700}>
        Brands
      </Typography>

      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {isLoading ? (
          <>
            {[1, 2, 3, 4].map((index) => (
              <Grid key={index} item xs={2} md={1}>
                <Skeleton variant="rounded" height={50} />
              </Grid>
            ))}
          </>
        ) : error ? (
          <Grid item xs={12}>
            <Message severity="error">{error?.data?.message}</Message>
          </Grid>
        ) : (
          <>
            {data?.brands.map((brand) => (
              <Grid key={brand._id} item xs={2} md={1}>
                <img
                  src={brand?.image?.url}
                  alt={brand?.name}
                  style={{
                    width: "100%",
                    height: "50px",
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
