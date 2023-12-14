import { useState } from "react";
import { useFormik } from "formik";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Close } from "@mui/icons-material";

import {
  useGetUsersQuery,
  useBlockUserMutation,
  useUnblockUserMutation,
} from "../../../slices/users.api.slice";
import { Message, LoadingScreen } from "../../../components";
import { useSnackbar } from "../../../hooks/useSnackbar";
import { blockUserValidation } from "../../../utils/admin.validation";

const UsersList = () => {
  const [showSnackbar, hideSnackbar, SnackbarComponent] = useSnackbar();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [userId, setUserId] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = (id) => {
    hideSnackbar();
    setUserId(id);
    setOpen(true);
  };
  const handleClose = () => {
    setUserId(null);
    setOpen(false);
    formik.resetForm();
  };

  const { data, isLoading, error } = useGetUsersQuery();
  const [blockUser, { isLoading: isBlocking }] = useBlockUserMutation();
  const [unblockUser, { isLoading: isUnblocking }] = useUnblockUserMutation();

  const unblockHandler = async (userId) => {
    hideSnackbar();
    try {
      const res = await unblockUser(userId).unwrap();
      showSnackbar(res?.message, "success");
    } catch (error) {
      showSnackbar(error?.data?.message, "error");
    }
  };

  // formik submit handler
  const onSubmit = async (values) => {
    hideSnackbar();
    try {
      const res = await blockUser({ userId, data: values }).unwrap();
      handleClose();
      showSnackbar(res?.message, "success");
    } catch (error) {
      handleClose();
      showSnackbar(error?.data?.message, "error");
    }
  };

  // formik hook
  const formik = useFormik({
    initialValues: {
      reason: "",
    },
    validationSchema: blockUserValidation,
    onSubmit,
  });

  if (isLoading || isBlocking || isUnblocking) return <LoadingScreen />;
  if (error) return <Message severity="error">{error?.data?.message}</Message>;

  return (
    <>
      <Stack gap={4}>
        <Typography variant="h4" component="h2">
          Users
        </Typography>

        {data?.numOfUsers === 0 ? (
          <Message severity="info">No orders found</Message>
        ) : (
          <TableContainer component={Paper} variant="outlined">
            <Table sx={{ minWidth: 650 }} aria-label="orders table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ minWidth: 150 }}>ID</TableCell>
                  <TableCell style={{ minWidth: 150 }}>Name</TableCell>
                  <TableCell style={{ minWidth: 100 }}>Orders</TableCell>
                  <TableCell style={{ minWidth: 100 }}>Total</TableCell>
                  <TableCell style={{ minWidth: 100 }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.users.map((user) => (
                  <TableRow
                    key={user?._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {user?._id}
                    </TableCell>
                    <TableCell>
                      {user?.firstName} {user?.lastName}
                    </TableCell>
                    <TableCell>{user?.ordersCount}</TableCell>
                    <TableCell>{user?.totalPrice}</TableCell>
                    <TableCell>
                      {user?.isBlocked?.status ? (
                        <Button
                          onClick={() => unblockHandler(user?._id)}
                          variant="outlined"
                          color="success"
                          size="small"
                        >
                          Unblock
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleOpen(user?._id)}
                          variant="outlined"
                          color="error"
                          size="small"
                        >
                          Block
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <SnackbarComponent />
      </Stack>

      <Dialog
        component="form"
        onSubmit={formik.handleSubmit}
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiDialog-paper": {
            width: "100%",
            maxWidth: "600px",
          },
        }}
      >
        <DialogTitle>Block Reason</DialogTitle>

        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>

        <DialogContent dividers>
          {/* reason */}
          <TextField
            required
            fullWidth
            variant="standard"
            id="block-reason"
            name="reason"
            label="Reason"
            value={formik.values.reason}
            onChange={formik.handleChange}
            error={formik.touched.reason && Boolean(formik.errors.reason)}
            helperText={formik.touched.reason && formik.errors.reason}
          />
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}
          >
            {formik.isSubmitting ? <CircularProgress size={24} /> : "Block"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UsersList;
