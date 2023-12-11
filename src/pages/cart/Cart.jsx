import { Fragment } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
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

  const cart = useSelector((state) => state.cart);

  const addToCartHandler = (product, quantity) =>
    dispatch(addToCart({ ...product, quantity }));

  const removeFromCartHandler = (id) => dispatch(removeFromCart(id));

  const checkoutHandler = () => navigate("/login?redirect=/shipping");

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        gap: 4,
        minHeight: { xs: "calc(100vh - 56px)", sm: "calc(100vh - 64px)" },
      }}
    >
      <Helmet>
        <title>Cart | Nile</title>
      </Helmet>
      <Typography variant="h4">Shopping Cart 🛒</Typography>

      <Divider />

      {cart?.cartItems.length === 0 ? (
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
          {/* products in cart */}
          <Stack flex={2}>
            {cart.cartItems.map((item) => (
              <Fragment key={item?._id}>
                <Stack
                  direction="row"
                  alignItems="center"
                  mb={2}
                  sx={{ gap: { xs: 1, sm: 4 } }}
                >
                  <img
                    src={item?.image?.url}
                    alt={item?.name}
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "contain",
                      borderRadius: "10px",
                    }}
                  />

                  {/* details */}
                  <Stack gap={1} textAlign={{ xs: "center", sm: "left" }}>
                    <Typography
                      variant="h6"
                      component={NavLink}
                      to={`/products/${item?._id}`}
                      color="inherit"
                    >
                      {item?.name}
                    </Typography>

                    <Typography fontWeight={500}>EGP {item?.price}</Typography>

                    {/* product amount */}
                    <Stack direction="row" alignItems="center" gap={2}>
                      <Box sx={{ minWidth: 60 }}>
                        <FormControl fullWidth size="small">
                          <InputLabel id="cart-select-quantity">Qty</InputLabel>
                          <Select
                            labelId="cart-select-quantity"
                            value={item?.quantity}
                            label="Qty"
                            onChange={(e) =>
                              addToCartHandler(item, Number(e.target.value))
                            }
                          >
                            {[...Array(item?.countInStock).keys()].map(
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
                        onClick={() => removeFromCartHandler(item?._id)}
                      >
                        <DeleteOutlineRounded />
                      </IconButton>
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
              {cart?.cartItems.reduce((acc, item) => acc + item?.quantity, 0)}{" "}
              items)
            </Typography>

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography>Subtotal</Typography>
              <Typography>EGP {cart?.itemsPrice}</Typography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography>Shipping</Typography>
              <Typography>EGP {cart?.shippingPrice}</Typography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6">EGP {cart?.totalPrice}</Typography>
            </Stack>

            <Button
              variant="contained"
              size="large"
              endIcon={<ShoppingCartCheckoutRounded />}
              disabled={cart?.cartItems?.length === 0}
              onClick={checkoutHandler}
            >
              Checkout Now
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/products")}
            >
              Continue Shopping
            </Button>
          </Paper>
        </Stack>
      )}
    </Container>
  );
};
export default Cart;
