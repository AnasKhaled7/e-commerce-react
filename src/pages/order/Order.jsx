import { Fragment } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Container, Divider, Paper, Stack, Typography } from "@mui/material";

import { LoadingScreen, Message } from "../../components";
import { useGetOrderDetailsQuery } from "../../slices/orders.api.slice";

const Order = () => {
  const { orderId } = useParams();

  const { data: order, isLoading, error } = useGetOrderDetailsQuery(orderId);

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
          {order.shippingAddress.city}, {order.shippingAddress.postalCode},{" "}
          {order.shippingAddress.country}
        </Typography>
        {order.isDelivered ? (
          <Message severity="success">Delivered on {order.deliveredAt}</Message>
        ) : (
          <Message severity="info">
            {order.status === "pending"
              ? "Order is pending"
              : "Order is on the way"}
          </Message>
        )}
      </Stack>

      <Divider />

      <Paper
        elevation={4}
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
                        to={`/products/${item._id}`}
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
        elevation={4}
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
            <Typography>Tax</Typography>
            <Typography>EGP {order.taxPrice}</Typography>
          </Stack>

          <Divider />

          <Stack direction="row" justifyContent="space-between">
            <Typography>Total</Typography>
            <Typography>EGP {order.totalPrice}</Typography>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
};
export default Order;
