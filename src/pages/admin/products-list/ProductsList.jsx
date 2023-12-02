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

  const { data, refetch, isLoading, error } = useGetProductsQuery();
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
        refetch();
        showSnackbar("Product deleted successfully", "success");
      } catch (err) {
        showSnackbar(error?.data?.message || error.error, "error");
      }
    }
  };

  if (isLoading || loadingDelete) return <LoadingScreen />;

  if (error)
    return (
      <Message severity="error">{error?.data?.message || error.error}</Message>
    );

  return (
    <Stack gap={4}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" component="h1">
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
        <>
          {/* table */}
          <TableContainer component={Paper} variant="outlined">
            <Table sx={{ minWidth: 650 }} aria-label="products table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ minWidth: 150 }} align="center">
                    ID
                  </TableCell>
                  <TableCell style={{ minWidth: 150 }} align="center">
                    Image
                  </TableCell>
                  <TableCell style={{ minWidth: 150 }} align="center">
                    Name
                  </TableCell>
                  <TableCell style={{ minWidth: 150 }} align="center">
                    Price
                  </TableCell>
                  <TableCell style={{ minWidth: 100 }} align="center">
                    Category
                  </TableCell>
                  <TableCell style={{ minWidth: 150 }} align="center">
                    Brand
                  </TableCell>
                  <TableCell style={{ minWidth: 150 }} align="center">
                    Actions
                  </TableCell>
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
                        style={{
                          width: 50,
                          height: 50,
                          objectFit: "contain",
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">{product?.name}</TableCell>
                    <TableCell align="center">EGP {product?.price}</TableCell>
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

          {/* pagination */}
        </>
      )}

      {/* modals */}
      <AddProductModal
        open={openCreateModal}
        handleClose={handleCloseCreateModal}
        refetch={refetch}
      />

      {/* snackbar */}
      <SnackbarComponent />
    </Stack>
  );
};
export default ProductsList;
