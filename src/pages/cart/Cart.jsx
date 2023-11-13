import { Fragment } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  Link,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import {
  DeleteOutlineRounded,
  ShoppingCartCheckoutRounded,
} from "@mui/icons-material";

import { Message } from "../../components";
import { addToCart, removeFromCart } from "../../slices/cart.slice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems, itemsPrice, taxPrice, totalPrice } = useSelector(
    (state) => state.cart
  );

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const chechotHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        my: 4,
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <Typography variant="h4">Shopping Cart</Typography>

      <Divider />

      {cartItems.length === 0 ? (
        <Stack direction="column" alignItems="center" gap={2} sx={{ flex: 1 }}>
          <Message severity="info">
            Your cart is empty{" "}
            <Link component={NavLink} to="/products" color="inherit">
              view products
            </Link>
          </Message>
        </Stack>
      ) : (
        <Stack direction={{ xs: "column", md: "row" }} gap={4}>
          {/* info */}
          <Stack flex={2} gap={1}>
            {/* product */}
            {cartItems.map((item) => (
              <Fragment key={item._id}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  gap={2}
                >
                  {/* product details */}
                  <Stack
                    direction="row"
                    alignItems="center"
                    gap={2}
                    flexWrap="wrap"
                  >
                    <img
                      src={item.defaultImage.url}
                      alt={item.name}
                      style={{
                        width: "180px",
                        height: "180px",
                        objectFit: "contain",
                      }}
                    />

                    {/* details */}
                    <Stack gap={2}>
                      <Link
                        component={NavLink}
                        to={`/products/${item._id}`}
                        color="inherit"
                        fontSize={18}
                        underline="none"
                      >
                        {item.name}
                      </Link>

                      <Typography fontWeight={700}>EGP {item.price}</Typography>

                      {/* product amount */}
                      <Stack direction="row" alignItems="center" gap={2}>
                        <Box sx={{ minWidth: 80 }}>
                          <FormControl fullWidth size="small">
                            <InputLabel id="select-quantity">
                              Quantity
                            </InputLabel>
                            <Select
                              labelId="select-quantity"
                              id="quantity"
                              value={item.qty}
                              label="Quantity"
                              onChange={(e) =>
                                addToCartHandler(item, Number(e.target.value))
                              }
                            >
                              {[...Array(item.countInStock).keys()].map(
                                (index) => (
                                  <MenuItem key={index + 1} value={index + 1}>
                                    {index + 1}
                                  </MenuItem>
                                )
                              )}
                            </Select>
                          </FormControl>
                        </Box>

                        <Divider orientation="vertical" flexItem />

                        <IconButton
                          color="error"
                          onClick={() => removeFromCartHandler(item._id)}
                        >
                          <DeleteOutlineRounded />
                        </IconButton>
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>

                <Divider />
              </Fragment>
            ))}
          </Stack>

          {/* summary */}
          <Paper
            variant="outlined"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              p: 2,
              flex: 1,
              height: "fit-content",
            }}
          >
            <Typography textAlign="center" variant="h6">
              Order Summary (
              {cartItems.reduce((acc, item) => acc + item.qty, 0)} items)
            </Typography>

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography>Subtotal</Typography>
              <Typography>EGP {itemsPrice}</Typography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography>Shipping</Typography>
              <Typography>EGP 0</Typography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography>Discount</Typography>
              <Typography>EGP 0</Typography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography>Taxes</Typography>
              <Typography>EGP {taxPrice}</Typography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6">EGP {totalPrice}</Typography>
            </Stack>

            <Button
              variant="contained"
              size="large"
              endIcon={<ShoppingCartCheckoutRounded />}
              disabled={cartItems.length === 0}
              onClick={chechotHandler}
            >
              Checkout Now
            </Button>

            <Button variant="outlined" size="large">
              Continue Shopping
            </Button>
          </Paper>
        </Stack>
      )}
    </Container>
  );
};
export default Cart;
