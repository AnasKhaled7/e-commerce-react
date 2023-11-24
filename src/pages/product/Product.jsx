import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

import { useGetProductQuery } from "../../slices/products.api.slice";
import { addToCart } from "../../slices/cart.slice";
import { LoadingScreen, Message } from "../../components";

const Product = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { data, isLoading, error } = useGetProductQuery(productId);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...data?.product, quantity }));
    navigate("/cart");
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
            alignItems: { md: "center" },
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
            minHeight: { xs: "calc(100vh - 56px)", sm: "calc(100vh - 64px)" },
          }}
        >
          {/* image container */}
          <Box flex={1}>
            <img
              src={data?.product?.image?.url}
              alt={data?.product?.name}
              style={{
                width: "100%",
                height: "100%",
                maxHeight: "400px",
                objectFit: "contain",
              }}
            />
          </Box>

          <Divider orientation="vertical" flexItem />

          {/* info container */}
          <Stack flex={1} gap={4}>
            {/* name */}
            <Typography variant="h4" fontWeight={700} textAlign="center">
              {data?.product?.name}
            </Typography>

            {/* description */}
            <Stack gap={1}>
              <Typography variant="caption">Description</Typography>
              <Typography>{data?.product?.description}</Typography>
            </Stack>

            {/* rating */}
            <Stack gap={1}>
              <Typography variant="caption">Rating</Typography>

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
            </Stack>

            {/* price */}
            <Stack>
              <Typography variant="caption">Price</Typography>
              <Typography variant="h6">EGP {data?.product?.price}</Typography>
            </Stack>

            {/* status */}
            <Stack direction="row" alignItems="center" gap={1}>
              <Typography
                color={data?.product?.countInStock > 0 ? "green" : "error"}
              >
                {data?.product?.countInStock > 0 ? "In Stock" : "Out of Stock"}
              </Typography>

              <Typography variant="caption" color="text.secondary">
                ({data?.product?.countInStock} left)
              </Typography>
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              {/* quantity selection */}
              {data?.product?.countInStock > 0 && (
                <Box sx={{ minWidth: 60 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="product-select-quantity">Qty</InputLabel>
                    <Select
                      labelId="product-select-quantity"
                      value={quantity}
                      label="Qty"
                      onChange={(e) => setQuantity(Number(e.target.value))}
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
