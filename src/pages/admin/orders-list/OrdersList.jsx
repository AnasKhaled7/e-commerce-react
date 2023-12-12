import { NavLink } from "react-router-dom";
import {
  Link,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { CloseRounded } from "@mui/icons-material";

import dateFormate from "../../../utils/dateFormat";
import { useGetOrdersQuery } from "../../../slices/orders.api.slice";
import { Message, LoadingScreen } from "../../../components";

const OrdersList = () => {
  const { data, isLoading, error } = useGetOrdersQuery();

  if (isLoading) return <LoadingScreen />;
  if (error)
    return (
      <Message severity="error">{error?.data?.message || error.error}</Message>
    );

  return (
    <Stack gap={4}>
      <Typography variant="h4" component="h1">
        Orders
      </Typography>

      {data?.numberOfOrders === 0 ? (
        <Message severity="info">No orders found</Message>
      ) : (
        <TableContainer component={Paper} variant="outlined">
          <Table sx={{ minWidth: 650 }} aria-label="orders table">
            <TableHead>
              <TableRow>
                <TableCell style={{ minWidth: 150 }} align="center">
                  ID
                </TableCell>
                <TableCell style={{ minWidth: 150 }} align="center">
                  User
                </TableCell>
                <TableCell style={{ minWidth: 150 }} align="center">
                  Date
                </TableCell>
                <TableCell style={{ minWidth: 100 }} align="center">
                  Total
                </TableCell>
                <TableCell style={{ minWidth: 150 }} align="center">
                  Paid
                </TableCell>
                <TableCell style={{ minWidth: 150 }} align="center">
                  Delivered
                </TableCell>
                <TableCell style={{ minWidth: 100 }} align="center">
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.orders.map((order) => (
                <TableRow
                  key={order?._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="order">
                    <Link
                      component={NavLink}
                      to={`/admin/orders-list/${order._id}`}
                    >
                      {order?._id}
                    </Link>
                  </TableCell>
                  <TableCell align="center">
                    {order?.user?.firstName} {order?.user?.lastName}
                  </TableCell>
                  <TableCell align="center">
                    {dateFormate(order?.createdAt)}
                  </TableCell>
                  <TableCell align="center">{order?.totalPrice}</TableCell>

                  <TableCell align="center">
                    {order?.isPaid ? (
                      <Typography variant="body2" color="success">
                        {dateFormate(order?.paidAt)}
                      </Typography>
                    ) : (
                      <Typography variant="body2" color="error">
                        <CloseRounded />
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {order?.isDelivered ? (
                      <Typography variant="body2" color="success">
                        {dateFormate(order?.deliveredAt)}
                      </Typography>
                    ) : (
                      <Typography variant="body2" color="error">
                        <CloseRounded />
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {order?.status === "pending" ? (
                      <Typography variant="body2" color="primary">
                        {order?.status}
                      </Typography>
                    ) : order?.status === "processing" ? (
                      <Typography variant="body2" color="secondary">
                        {order?.status}
                      </Typography>
                    ) : order?.status === "delivered" ? (
                      <Typography variant="body2" color="textSecondary">
                        {order?.status}
                      </Typography>
                    ) : (
                      <Typography variant="body2" color="error">
                        {order?.status}
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Stack>
  );
};

export default OrdersList;
