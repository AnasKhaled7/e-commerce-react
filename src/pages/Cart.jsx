import React from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import ShoppingCartCheckoutRoundedIcon from "@mui/icons-material/ShoppingCartCheckoutRounded";
import product from "../assets/product-5.png";

const Cart = () => {
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

      <Stack direction={{ xs: "column", md: "row" }} gap={4}>
        {/* info */}
        <Stack flex={2} gap={2}>
          {/* product */}
          {[1, 2, 3].map((item) => (
            <React.Fragment key={item}>
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
                    src={product}
                    alt="product"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "contain",
                    }}
                  />

                  {/* details */}
                  <Stack gap={0.5}>
                    <Typography
                      variant="h6"
                      fontWeight={400}
                      textTransform="capitalize"
                    >
                      product name
                    </Typography>
                    <Typography variant="h6">EGP 500.00</Typography>
                    {/* color */}
                    <Stack direction="row" alignItems="center" gap={0.5}>
                      <Typography variant="caption">
                        <b>Color:</b>
                      </Typography>
                      <Box
                        sx={{
                          width: "18px",
                          height: "18px",
                          border: "1px solid #ccc",
                          borderRadius: "50%",
                          bgcolor: "black",
                        }}
                      />
                    </Stack>

                    <Typography variant="caption">
                      <b>Size:</b> L
                    </Typography>
                  </Stack>
                </Stack>

                {/* product amount */}
                <Stack direction="row" alignItems="center" gap={1}>
                  <IconButton size="small">
                    <RemoveRoundedIcon />
                  </IconButton>
                  <Typography component="p" variant="h4" fontWeight={300}>
                    1
                  </Typography>
                  <IconButton size="small">
                    <AddRoundedIcon />
                  </IconButton>
                </Stack>
              </Stack>

              <Divider />
            </React.Fragment>
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
            // width: "100%",
            height: "fit-content",
          }}
        >
          <Typography textAlign="center" variant="h4">
            Order Summary
          </Typography>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography>Subtotal</Typography>
            <Typography>EGP 1500.00</Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography>Shipping</Typography>
            <Typography>EGP 50.00</Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography>Discount</Typography>
            <Typography>EGP -200.00</Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Total</Typography>
            <Typography variant="h6">EGP 1350.00</Typography>
          </Stack>

          <Button
            variant="contained"
            size="large"
            endIcon={<ShoppingCartCheckoutRoundedIcon />}
          >
            Checkout Now
          </Button>

          <Button variant="outlined" size="large">
            Continue Shopping
          </Button>
        </Paper>
      </Stack>
    </Container>
  );
};
export default Cart;
