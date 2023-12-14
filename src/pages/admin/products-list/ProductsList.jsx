import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Button,
  IconButton,
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
import {
  AddCircleOutlineRounded,
  DeleteOutlineRounded,
} from "@mui/icons-material";

import {
  useGetProductsQuery,
  useDeleteProductMutation,
} from "../../../slices/products.api.slice";
import { Message, LoadingScreen } from "../../../components";
import { AddProductModal } from "./components";
import { useSnackbar } from "../../../hooks/useSnackbar";

const ProductsList = () => {
  const [showSnackbar, hideSnackbar, SnackbarComponent] = useSnackbar();

  const { data, isLoading, error } = useGetProductsQuery({
    page: 1,
    limit: 10,
  });
  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  // create product modal
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const handleOpenCreateModal = () => setOpenCreateModal(true);
  const handleCloseCreateModal = () => setOpenCreateModal(false);

  const deleteHandler = async (id) => {
    hideSnackbar();
    if (window.confirm("Are you sure?")) {
      try {
        await deleteProduct(id);
        showSnackbar("Product deleted successfully", "success");
      } catch (err) {
        showSnackbar(error?.data?.message, "error");
      }
    }
  };

  const columns = [
    { label: "ID" },
    { label: "Image" },
    { label: "Name" },
    { label: "Price" },
    { label: "Discount" },
    { label: "Final Price" },
    { label: "Stock" },
    { label: "Category" },
    { label: "Brand" },
    { label: "Actions" },
  ];

  if (isLoading || loadingDelete) return <LoadingScreen />;
  if (error) return <Message severity="error">{error?.data?.message}</Message>;

  return (
    <Stack gap={4}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" component="h2">
          Products
        </Typography>
        <Button
          variant="outlined"
          startIcon={<AddCircleOutlineRounded />}
          onClick={handleOpenCreateModal}
        >
          Add Product
        </Button>
      </Stack>

      {data?.numOfProducts === 0 ? (
        <Message severity="info">No products found</Message>
      ) : (
        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.label}
                    style={{ minWidth: 170 }}
                    align="center"
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.products.map((product) => (
                <TableRow key={product?._id}>
                  <TableCell align="center">
                    <Link
                      component={NavLink}
                      to={`/admin/products-list/${product?._id}`}
                    >
                      {product?._id}
                    </Link>
                  </TableCell>
                  <TableCell align="center">
                    <img
                      src={product?.image?.url}
                      alt={product?.name}
                      width="60"
                      height="60"
                      style={{ objectFit: "contain" }}
                    />
                  </TableCell>
                  <TableCell align="center">{product?.name}</TableCell>
                  <TableCell align="center">EGP {product?.price}</TableCell>
                  <TableCell align="center">{product?.discount}%</TableCell>
                  <TableCell align="center">
                    EGP {product?.finalPrice}
                  </TableCell>
                  <TableCell align="center">{product?.countInStock}</TableCell>
                  <TableCell align="center">
                    {product?.category?.name}
                  </TableCell>
                  <TableCell align="center">{product?.brand?.name}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="error"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <DeleteOutlineRounded />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* modals */}
      <AddProductModal
        open={openCreateModal}
        handleClose={handleCloseCreateModal}
      />

      {/* snackbar */}
      <SnackbarComponent />
    </Stack>
  );
};
export default ProductsList;
