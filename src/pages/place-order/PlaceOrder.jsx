import { Fragment, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { CheckoutSteps, Message } from "../../components";
import { useCreateOrderMutation } from "../../slices/orders.api.slice";
import { clearCartItems } from "../../slices/cart.slice";
import { useSnackbar } from "../../hooks/useSnackbar";

const PlaceOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const [showSnackbar, hideSnackbar, SnackbarComponent] = useSnackbar();

  useEffect(() => {
    if (!cart.shippingAddress.address) navigate("/shipping");
  }, [cart, navigate]);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  const placeOrderHandler = async () => {
    hideSnackbar();
    try {
      const orderItems = cart.cartItems.map((item) => ({
        product: item._id,
        name: item.name,
        image: item.defaultImage.url,
        price: item.price,
        quantity: item.quantity,
      }));

      const res = await createOrder({
        orderItems: orderItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();

      dispatch(clearCartItems());
      navigate(`/orders/${res.order._id}`);
    } catch (error) {
      console.log(error);
      showSnackbar(error?.data?.message || error.error, "error");
    }
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 4,
        minHeight: { xs: "calc(100vh - 56px)", sm: "calc(100vh - 64px)" },
      }}
    >
      <Stack direction={{ xs: "column", md: "row" }} gap={4}>
        {/* left part: details */}
        <Stack flex={2} gap={4}>
          <Stack gap={1}>
            <Typography variant="h5">Shipping</Typography>
            <Typography>
              <strong>Address: </strong>
              {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
              {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
            </Typography>
          </Stack>

          <Stack gap={1}>
            <Typography variant="h5">Order Items</Typography>

            {cart.cartItems.length === 0 ? (
              <Message severity="info">Your cart is empty</Message>
            ) : (
              <Stack gap={2}>
                {cart.cartItems.map((item) => (
                  <Fragment key={item._id}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      flexWrap="wrap"
                      gap={2}
                    >
                      <img
                        src={item.defaultImage.url}
                        alt={item.name}
                        width="100"
                        height="100"
                        style={{ objectFit: "contain" }}
                      />
                      <Typography
                        variant="h6"
                        component={NavLink}
                        to={`/products/${item._id}`}
                        color="inherit"
                      >
                        {item.name}
                      </Typography>
                      <Typography variant="body2">
                        {item.quantity} x EGP {item.price} = EGP{" "}
                        {item.quantity * item.price}
                      </Typography>
                    </Stack>

                    <Divider />
                  </Fragment>
                ))}
              </Stack>
            )}
          </Stack>
        </Stack>

        {/* right part: order summary */}
        <Paper
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            p: 2,
            height: "fit-content",
          }}
        >
          <Typography variant="h5" textAlign="center">
            Order Summary
          </Typography>

          <Stack gap={2}>
            <Stack direction="row" justifyContent="space-between">
              <Typography>Items</Typography>
              <Typography>EGP {cart.itemsPrice}</Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Typography>Shipping</Typography>
              <Typography>EGP {cart.shippingPrice}</Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Typography>Tax</Typography>
              <Typography>EGP {cart.taxPrice}</Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Typography>Total</Typography>
              <Typography>EGP {cart.totalPrice}</Typography>
            </Stack>

            <Button
              variant="contained"
              disabled={cart.cartItems.length === 0}
              onClick={placeOrderHandler}
            >
              {isLoading ? <CircularProgress size={24} /> : "Place Order"}
            </Button>

            {error && (
              <Message severity="error">
                {error.message || "Something went wrong"}
              </Message>
            )}
          </Stack>
        </Paper>
      </Stack>

      <CheckoutSteps activeStep={2} />

      <SnackbarComponent />
    </Container>
  );
};
export default PlaceOrder;
