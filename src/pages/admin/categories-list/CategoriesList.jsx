import { useState } from "react";
import {
  Button,
  IconButton,
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
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
} from "../../../slices/categories.api.slice";
import { useSnackbar } from "../../../hooks/useSnackbar";
import { AddCategoryModal } from "./components";

const CategoriesList = () => {
  const [showSnackbar, hideSnackbar, SnackbarComponent] = useSnackbar();

  const { data, error, isLoading } = useGetCategoriesQuery("categories");
  const [deleteCategory, { isLoading: loadingDelete }] =
    useDeleteCategoryMutation();

  // create category modal
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const handleOpenCreateModal = () => setOpenCreateModal(true);
  const handleCloseCreateModal = () => setOpenCreateModal(false);

  const deleteHandler = async (categoryId) => {
    hideSnackbar();
    if (window.confirm("Are you sure?")) {
      try {
        const res = await deleteCategory(categoryId).unwrap();
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
          Categories
        </Typography>
        <Button
          variant="outlined"
          startIcon={<AddCircleOutlineRounded />}
          onClick={handleOpenCreateModal}
        >
          Add Category
        </Button>
      </Stack>

      {data?.numOfCategories === 0 ? (
        <Message severity="info">No categories found</Message>
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
              {data?.categories.map((category) => (
                <TableRow key={category?._id}>
                  <TableCell>{category?._id}</TableCell>
                  <TableCell>
                    <img
                      src={category?.image}
                      alt={category?.name}
                      width="60"
                      height="60"
                      style={{ objectFit: "contain" }}
                    />
                  </TableCell>
                  <TableCell>{category?.name}</TableCell>
                  <TableCell>
                    <IconButton
                      color="error"
                      onClick={() => deleteHandler(category?._id)}
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

      {/* create category modal */}
      <AddCategoryModal
        open={openCreateModal}
        handleClose={handleCloseCreateModal}
      />
      <SnackbarComponent />
    </Stack>
  );
};
export default CategoriesList;
