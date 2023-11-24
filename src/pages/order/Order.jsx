import { Fragment } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Button,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { AttachMoneyRounded, LocalShippingRounded } from "@mui/icons-material";

import { LoadingScreen, Message } from "../../components";
import {
  useGetOrderDetailsQuery,
  useDeliverOrderMutation,
  usePayOrderMutation,
} from "../../slices/orders.api.slice";
import { useSnackbar } from "../../hooks/useSnackbar";

const Order = () => {
  const { orderId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);

  const [showSnackbar, hideSnackbar, SnackbarComponent] = useSnackbar();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);
  const [payOrder, { isLoading: isPaying }] = usePayOrderMutation(orderId);
  const [deliverOrder, { isLoading: isDelivering }] =
    useDeliverOrderMutation(orderId);

  const deliverOrderHandler = async () => {
    hideSnackbar();
    try {
      await deliverOrder(orderId);
      refetch();
      showSnackbar("Order delivered successfully");
    } catch (error) {
      showSnackbar(error?.data?.message || error.error);
    }
  };

  const payOrderHandler = async () => {
    hideSnackbar();
    try {
      await payOrder(orderId);
      refetch();
      showSnackbar("Order paid successfully");
    } catch (error) {
      showSnackbar(error?.data?.message || error.error);
    }
  };

  return isLoading ? (
    <LoadingScreen />
  ) : error ? (
    <Message severity="error">{error?.data?.message || error.error}</Message>
  ) : (
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
      <Typography
        variant="h6"
        component="h2"
        fontWeight={700}
        textAlign="center"
      >
        Order
        <br />
        {orderId}
      </Typography>

      <Stack gap={2}>
        <Typography variant="h6">Shipping</Typography>
        <Typography>
          <strong>Name: </strong> {order.user.firstName} {order.user.lastName}
        </Typography>
        <Typography>
          <strong>Email: </strong> {order.user.email}
        </Typography>
        <Typography>
          <strong>Address: </strong> {order.shippingAddress.address},{" "}
          {order.shippingAddress.city}, {order.shippingAddress.postalCode}
        </Typography>
        {order.status === "pending" ? (
          <Message severity="warning">Your order is pending</Message>
        ) : order.status === "processing" ? (
          <Message severity="info">Your order is being processed</Message>
        ) : order.status === "cancelled" ? (
          <Message severity="error">Your order has been cancelled</Message>
        ) : (
          <Message severity="success">
            Your order has been delivered successfully
          </Message>
        )}
      </Stack>

      <Divider />

      <Paper
        variant="outlined"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 2,
          maxWidth: 800,
          width: "100%",
          margin: "auto",
        }}
      >
        <Typography variant="h4" textAlign="center">
          Order Items
        </Typography>
        {order.orderItems.length === 0 ? (
          <Message severity="info">Your order is empty</Message>
        ) : (
          <Stack gap={2}>
            {order.orderItems.map((item, index) => (
              <Fragment key={item.product}>
                <Stack direction="row" alignItems="center" gap={2}>
                  <img
                    src={item.image}
                    alt={item.name}
                    width={100}
                    height={100}
                    style={{ objectFit: "contain" }}
                  />
                  <Stack flex={1} gap={1}>
                    <Typography>
                      <strong>Name: </strong>
                      <Typography
                        component={NavLink}
                        to={`/products/${item.product}`}
                        color="inherit"
                      >
                        {item.name}
                      </Typography>
                    </Typography>
                    <Typography>
                      <strong>Qty: </strong> {item.quantity}
                    </Typography>
                    <Typography>
                      <strong>Price: </strong> EGP {item.price}
                    </Typography>
                  </Stack>
                </Stack>

                {
                  // don't render divider for last item
                  index !== order.orderItems.length - 1 && <Divider />
                }
              </Fragment>
            ))}
          </Stack>
        )}
      </Paper>

      <Divider />

      <Paper
        variant="outlined"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          p: 2,
          maxWidth: 800,
          width: "100%",
          margin: "auto",
        }}
      >
        <Typography variant="h4" textAlign="center">
          Order Summary
        </Typography>
        <Stack flex={1} gap={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography>Subtotal</Typography>
            <Typography>EGP {order.itemsPrice}</Typography>
          </Stack>

          <Divider />

          <Stack direction="row" justifyContent="space-between">
            <Typography>Shipping</Typography>
            <Typography>EGP {order.shippingPrice}</Typography>
          </Stack>

          <Divider />

          <Stack direction="row" justifyContent="space-between">
            <Typography>Total</Typography>
            <Typography>EGP {order.totalPrice}</Typography>
          </Stack>
        </Stack>
      </Paper>

      {userInfo?.isAdmin && (
        <>
          <Divider />

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            gap={2}
          >
            {!order?.isPaid && order?.status !== "cancelled" && (
              <Button
                variant="outlined"
                size="large"
                onClick={payOrderHandler}
                disabled={isPaying}
                endIcon={<LocalShippingRounded />}
              >
                {isPaying ? <CircularProgress size={24} /> : "Mark as Paid"}
              </Button>
            )}

            {!order?.isDelivered && order?.status !== "cancelled" && (
              <Button
                variant="outlined"
                size="large"
                onClick={deliverOrderHandler}
                disabled={isDelivering}
                endIcon={<AttachMoneyRounded />}
              >
                {isDelivering ? (
                  <CircularProgress size={24} />
                ) : (
                  "Mark as Delivered"
                )}
              </Button>
            )}
          </Stack>
        </>
      )}

      <SnackbarComponent />
    </Container>
  );
};
export default Order;
