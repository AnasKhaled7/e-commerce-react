import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { AddShoppingCartRounded } from "@mui/icons-material";

import { useGetProductQuery } from "../slices/productsApiSlice";
import { addToCart } from "../slices/cart.slice";
import { LoadingScreen, Message } from "../components";

const Product = () => {
  const { productId } = useParams();
  const { data, isLoading, error } = useGetProductQuery(productId);

  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...data?.product, qty }));
  };

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
            minHeight: "85vh",
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
            <Stack direction="row" alignItems="center" gap={1}>
              <Typography
                variant="body1"
                color={data?.product?.countInStock > 0 ? "green" : "error"}
              >
                {data?.product?.countInStock > 0 ? "In Stock" : "Out of Stock"}
              </Typography>

              <Typography variant="caption" color="text.secondary">
                ({data?.product?.countInStock} left)
              </Typography>
            </Stack>

            <Divider />

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              {/* quantity selection */}
              {data?.product?.countInStock > 0 && (
                <Box sx={{ minWidth: 80 }}>
                  <FormControl fullWidth>
                    <InputLabel id="select-quantity">Quantity</InputLabel>
                    <Select
                      labelId="select-quantity"
                      id="quantity"
                      value={qty}
                      label="Quantity"
                      onChange={(e) => setQty(Number(e.target.value))}
                    >
                      {[...Array(data?.product?.countInStock).keys()].map(
                        (index) => (
                          <MenuItem key={index + 1} value={index + 1}>
                            {index + 1}
                          </MenuItem>
                        )
                      )}
                    </Select>
                  </FormControl>
                </Box>
              )}

              {/* add to cart */}
              <Button
                variant="contained"
                size="large"
                endIcon={<AddShoppingCartRounded />}
                disabled={data?.product?.countInStock === 0}
                onClick={addToCartHandler}
              >
                Add to Cart
              </Button>
            </Stack>
          </Stack>
        </Container>
      )}
    </>
  );
};
export default Product;
