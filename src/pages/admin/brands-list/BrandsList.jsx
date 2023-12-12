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

import { LoadingScreen, Message } from "../../../components";
import {
  useGetBrandsQuery,
  useDeleteBrandMutation,
} from "../../../slices/brands.api.slice";
import { useSnackbar } from "../../../hooks/useSnackbar";
import { AddBrandModal } from "./components";

const BrandsList = () => {
  const [showSnackbar, hideSnackbar, SnackbarComponent] = useSnackbar();

  const { data, error, isLoading } = useGetBrandsQuery();
  const [deleteBrand, { isLoading: loadingDelete }] = useDeleteBrandMutation();

  // create brand modal
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const handleOpenCreateModal = () => setOpenCreateModal(true);
  const handleCloseCreateModal = () => setOpenCreateModal(false);

  const deleteHandler = async (brandId) => {
    hideSnackbar();
    if (window.confirm("Are you sure?")) {
      try {
        const res = await deleteBrand(brandId).unwrap();
        showSnackbar(res?.message, "success");
      } catch (err) {
        showSnackbar(error?.data?.message, "error");
      }
    }
  };

  if (isLoading || loadingDelete) return <LoadingScreen />;
  if (error) return <Message severity="error">{error?.data?.message}</Message>;

  return (
    <Stack gap={4}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" component="h2">
          Brands
        </Typography>
        <Button
          variant="outlined"
          startIcon={<AddCircleOutlineRounded />}
          onClick={handleOpenCreateModal}
        >
          Add Brand
        </Button>
      </Stack>

      {data?.numOfBrands === 0 ? (
        <Message severity="info">No brands found</Message>
      ) : (
        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.brands.map((brand) => (
                <TableRow key={brand?._id}>
                  <TableCell>
                    <Link
                      component={NavLink}
                      to={`/admin/brands-list/${brand?._id}`}
                    >
                      {brand?._id}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <img
                      src={brand?.image?.url}
                      alt={brand?.name}
                      width="60"
                      height="60"
                      style={{ objectFit: "contain" }}
                    />
                  </TableCell>
                  <TableCell>{brand?.name}</TableCell>
                  <TableCell>
                    <IconButton
                      color="error"
                      onClick={() => deleteHandler(brand?._id)}
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

      {/* create brand modal */}
      <AddBrandModal
        open={openCreateModal}
        handleClose={handleCloseCreateModal}
      />
      <SnackbarComponent />
    </Stack>
  );
};
export default BrandsList;
