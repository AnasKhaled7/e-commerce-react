import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Divider,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { AddShoppingCartRounded } from "@mui/icons-material";

import { useGetProductQuery } from "../slices/productsApiSlice";
import { LoadingScreen, Message } from "../components";

const Product = () => {
  const { productId } = useParams();
  const { data, isLoading, error } = useGetProductQuery(productId);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : error ? (
        <Message severity="error">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Container
          maxWidth="xl"
          sx={{
            py: 4,
            display: "flex",
            alignItems: { sm: "center" },
            flexDirection: { xs: "column", sm: "row" },
            gap: 4,
            minHeight: "calc(100vh - 64px)",
          }}
        >
          {/* image container */}
          <Box flex={1}>
            <img
              src={data?.product?.defaultImage.url}
              alt={data?.product?.name}
              style={{
                width: "100%",
                height: "100%",
                maxHeight: "400px",
                objectFit: "contain",
              }}
            />
          </Box>

          {/* info container */}
          <Stack flex={1} gap={2}>
            {/* name */}
            <Typography variant="h4">{data?.product?.name}</Typography>

            <Divider />

            {/* description */}
            <Typography variant="body2">
              {data?.product?.description}
            </Typography>

            <Divider />

            <Stack direction="row" alignItems="center" gap={1}>
              <Rating
                name="rating"
                value={data?.product?.rating}
                precision={0.5}
                readOnly
              />

              <Typography variant="caption" color="text.secondary">
                ({data?.product?.numReviews} reviews)
              </Typography>
            </Stack>

            <Divider />

            {/* price */}
            <Typography variant="h6">EGP {data?.product?.price}</Typography>

            <Divider />

            {/* status */}
            <Typography
              variant="body1"
              color={data?.product?.countInStock > 0 ? "green" : "error"}
            >
              {data?.product?.countInStock > 0 ? "In Stock" : "Out of Stock"}
            </Typography>

            <Divider />

            {/* add to cart */}
            <Button
              variant="contained"
              size="large"
              endIcon={<AddShoppingCartRounded />}
              disabled={data?.product?.countInStock === 0}
              sx={{ alignSelf: "flex-start" }}
            >
              Add to Cart
            </Button>
          </Stack>
        </Container>
      )}
    </>
  );
};
export default Product;
