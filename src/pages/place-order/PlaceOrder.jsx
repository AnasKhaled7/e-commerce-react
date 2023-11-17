import { Fragment, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  CircularProgress,
  Container,
  Divider,
  Link,
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
    else if (!cart.paymentMethod) navigate("/payment");
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

      await createOrder({
        orderItems: orderItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/orders/${orderItems[0].product}`);
    } catch (error) {
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
      <Stack direction="row">
        {/* left part: details */}
        <Stack flex={2} gap={2}>
          <Stack gap={2}>
            <Typography variant="h4">Shipping</Typography>
            <Typography>
              <strong>Address: </strong>
              {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
              {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
            </Typography>
          </Stack>

          <Stack gap={2}>
            <Typography variant="h4">Payment Method</Typography>
            <Typography>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </Typography>
          </Stack>

          <Stack gap={2}>
            <Typography variant="h4">Order Items</Typography>

            {cart.cartItems.length === 0 ? (
              <Message severity="info">Your cart is empty</Message>
            ) : (
              <Stack gap={2}>
                {cart.cartItems.map((item) => (
                  <Fragment key={item._id}>
                    <Stack direction="row" alignItems="center" gap={2}>
                      <img
                        src={item.defaultImage.url}
                        alt={item.name}
                        width="100"
                        height="100"
                        style={{ objectFit: "contain" }}
                      />
                      <Link
                        component={NavLink}
                        to={`/products/${item._id}`}
                        underline="hover"
                        color="inherit"
                      >
                        {item.name}
                      </Link>
                      <Typography>
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
        <Stack flex={1}>
          <Typography variant="h4">Order Summary</Typography>

          <Stack gap={2}>
            <Stack direction="row" justifyContent="space-between">
              <Typography>Items</Typography>
              <Typography>EGP {cart.itemsPrice}</Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Typography>Shipping</Typography>
              <Typography>EGP 0</Typography>
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
        </Stack>
      </Stack>

      <CheckoutSteps activeStep={3} />

      <SnackbarComponent />
    </Container>
  );
};
export default PlaceOrder;
