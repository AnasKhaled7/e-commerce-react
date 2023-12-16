import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import { useGetMyOrdersQuery } from "../../slices/orders.api.slice";
import { LoadingScreen, Message, PageHeader } from "../../components";
import dateFormate from "../../utils/dateFormat";

const MyOrders = () => {
  const navigate = useNavigate();
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

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
      <Helmet>
        <title>My Orders | Nile</title>
      </Helmet>

      <PageHeader text={`My Orders (${orders.length})`} />

      <Grid container spacing={2}>
        {orders.map((order) => (
          <Grid key={order._id} item xs={12} sm={6} md={4} lg={3}>
            <Card variant="outlined">
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                {order.status === "pending" ? (
                  <Chip
                    label={order.status}
                    color="warning"
                    size="small"
                    variant="outlined"
                    sx={{ textTransform: "capitalize", alignSelf: "end" }}
                  />
                ) : order.status === "processing" ? (
                  <Chip
                    label={order.status}
                    color="info"
                    size="small"
                    variant="outlined"
                    sx={{ textTransform: "capitalize", alignSelf: "end" }}
                  />
                ) : (
                  <Chip
                    label={order.status}
                    color="success"
                    size="small"
                    variant="outlined"
                    sx={{ textTransform: "capitalize", alignSelf: "end" }}
                  />
                )}

                <div>
                  <Typography variant="caption" color="text.secondary">
                    Order ID
                  </Typography>
                  <Typography>{order._id}</Typography>
                </div>

                <div>
                  <Typography variant="caption" color="text.secondary">
                    Order Date
                  </Typography>
                  <Typography>{dateFormate(order?.createdAt)}</Typography>
                </div>

                <div>
                  <Typography variant="caption" color="text.secondary">
                    Total
                  </Typography>
                  <Typography>EGP {order.totalPrice}</Typography>
                </div>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="outlined"
                  fullWidth
                  onClick={() => navigate(`/orders/${order._id}`)}
                >
                  Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
export default MyOrders;
