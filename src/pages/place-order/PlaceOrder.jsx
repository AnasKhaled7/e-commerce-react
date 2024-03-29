import { Fragment, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import {
  Button,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import {
  CheckoutSteps,
  LoadingScreen,
  Message,
  PageSection,
} from "../../components";
import { useCreateOrderMutation } from "../../slices/orders.api.slice";
import { clearCartItems } from "../../slices/cart.slice";
import { useSnackbar } from "../../hooks/useSnackbar";
import { useGetProfileQuery } from "../../slices/users.api.slice";

const PlaceOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  const [showSnackbar, hideSnackbar, SnackbarComponent] = useSnackbar();

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  const { data, isLoading: dataLoading, dataError } = useGetProfileQuery();

  useEffect(() => {
    if (!data?.user?.shippingAddress?.address && data?.user?.phone)
      navigate("/shipping");
  }, [data, navigate]);

  const placeOrderHandler = async () => {
    hideSnackbar();
    try {
      const orderItems = cart.cartItems.map((item) => ({
        product: item?._id,
        name: item?.name,
        image: item?.image?.url,
        price: item?.price,
        discount: item?.discount,
        finalPrice: item?.finalPrice,
        quantity: item?.quantity,
      }));

      const res = await createOrder({
        orderItems: orderItems,
        shippingAddress: data?.user?.shippingAddress,
        phone: data?.user?.phone,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();

      dispatch(clearCartItems());
      navigate(`/orders/${res.order._id}`);
    } catch (error) {
      console.log(error);
      showSnackbar(error?.data?.message, "error");
    }
  };

  if (dataLoading) return <LoadingScreen />;
  if (dataError)
    return <Message severity="error">{dataError?.data?.message}</Message>;

  return (
    <PageSection>
      <Helmet>
        <title>Place Order | Nile</title>
      </Helmet>

      <CheckoutSteps activeStep={2} />

      <Stack direction={{ xs: "column", md: "row" }} gap={4}>
        {/* left part: details */}
        <Stack flex={2} gap={4}>
          <Stack gap={1}>
            <Typography
              component="h2"
              variant="h5"
              fontWeight={700}
              color="Highlight"
            >
              Shipping
            </Typography>
            <Typography>
              <strong>Address: </strong>
              {data?.user?.shippingAddress?.address},{" "}
              {data?.user?.shippingAddress?.city},{" "}
              {data?.user?.shippingAddress?.postalCode}
            </Typography>
          </Stack>

          <Stack gap={1}>
            <Typography
              component="h2"
              variant="h5"
              fontWeight={700}
              color="Highlight"
            >
              Order Items
            </Typography>

            {cart.cartItems.length === 0 ? (
              <Message severity="info">Your cart is empty</Message>
            ) : (
              <Stack gap={2}>
                {cart.cartItems.map((item, index) => (
                  <Fragment key={item._id}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      flexWrap="wrap"
                      gap={2}
                    >
                      <img
                        src={item?.image?.url}
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

                    {
                      // don't render divider for last item
                      index !== cart.cartItems.length - 1 && <Divider />
                    }
                  </Fragment>
                ))}
              </Stack>
            )}
          </Stack>
        </Stack>

        {/* right part: order summary */}
        <Paper
          variant="outlined"
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

      {SnackbarComponent}
    </PageSection>
  );
};
export default PlaceOrder;
