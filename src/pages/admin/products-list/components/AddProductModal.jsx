import { useFormik } from "formik";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Close, CloudUpload } from "@mui/icons-material";

import { useCreateProductMutation } from "../../../../slices/products.api.slice";
import { useSnackbar } from "../../../../hooks/useSnackbar";
import { useGetCategoriesNamesQuery } from "../../../../slices/categories.api.slice";
import { useGetBrandsNamesQuery } from "../../../../slices/brands.api.slice";
import { addProductValidation } from "../../../../utils/admin.validation";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const AddProductModal = ({ open, handleClose }) => {
  const [showSnackbar, hideSnackbar, SnackbarComponent] = useSnackbar();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [createProduct] = useCreateProductMutation();

  const { data: categories } = useGetCategoriesNamesQuery();
  const { data: brands } = useGetBrandsNamesQuery();

  const handleFileUpload = (e) => {
    if (e.currentTarget.files.length)
      formik.setFieldValue("image", e.currentTarget.files[0]);
  };

  // formik submit handler
  const onSubmit = async (values) => {
    hideSnackbar();
    try {
      let formData = new FormData();
      for (let field in values) formData.append(field, values[field]);
      await createProduct(formData).unwrap();
      formik.resetForm();
      handleClose();
    } catch (error) {
      console.log(error);
      showSnackbar(error?.data?.message, "error");
    }
  };

  // formik hook
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      image: "",
      category: "",
      brand: "",
      price: 0,
      countInStock: 0,
      discount: 0,
    },
    validationSchema: addProductValidation,
    onSubmit,
  });

  return (
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
      <DialogTitle>Add Product</DialogTitle>

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

      <DialogContent
        dividers
        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
      >
        <DialogContentText>Please enter product details</DialogContentText>

        <Stack gap={3}>
          {/* name */}
          <TextField
            required
            id="product-name"
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />

          {/* description */}
          <TextField
            required
            id="product-description"
            name="description"
            label="Description"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
            multiline
            rows={6}
          />

          {/* category */}
          <Box sx={{ minWidth: 120 }}>
            <FormControl
              fullWidth
              error={formik.touched.category && Boolean(formik.errors.category)}
            >
              <InputLabel id="product-category-label">Category</InputLabel>
              <Select
                name="category"
                labelId="product-category-label"
                id="product-category"
                value={formik.values.category}
                label="Category"
                onChange={formik.handleChange}
              >
                {categories?.categories?.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {formik.touched.category && formik.errors.category}
              </FormHelperText>
            </FormControl>
          </Box>

          {/* brand */}
          <Box sx={{ minWidth: 120 }}>
            <FormControl
              fullWidth
              error={formik.touched.brand && Boolean(formik.errors.brand)}
            >
              <InputLabel id="product-brand-label">Brand</InputLabel>
              <Select
                name="brand"
                labelId="product-brand-label"
                id="product-brand"
                value={formik.values.brand}
                label="Brand"
                onChange={formik.handleChange}
              >
                {brands?.brands?.map((brand) => (
                  <MenuItem key={brand._id} value={brand._id}>
                    {brand.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {formik.touched.brand && formik.errors.brand}
              </FormHelperText>
            </FormControl>
          </Box>

          {/* price */}
          <TextField
            required
            id="product-price"
            name="price"
            label="Price"
            type="number"
            value={formik.values.price}
            onChange={formik.handleChange}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
          />

          {/* count in stock */}
          <TextField
            required
            id="product-count-in-stock"
            name="countInStock"
            label="Count in stock"
            type="number"
            value={formik.values.countInStock}
            onChange={formik.handleChange}
            error={
              formik.touched.countInStock && Boolean(formik.errors.countInStock)
            }
            helperText={
              formik.touched.countInStock && formik.errors.countInStock
            }
          />

          {/* discount */}
          <TextField
            id="product-discount"
            name="discount"
            label="Discount"
            type="number"
            value={formik.values.discount}
            onChange={formik.handleChange}
            error={formik.touched.discount && Boolean(formik.errors.discount)}
            helperText={formik.touched.discount && formik.errors.discount}
          />

          {/* image */}
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUpload />}
          >
            Upload file
            <VisuallyHiddenInput
              id="product-image"
              type="file"
              name="image"
              onChange={handleFileUpload}
            />
          </Button>
          <FormHelperText>
            {formik.touched.image && formik.errors.image}
          </FormHelperText>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button
          type="submit"
          disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}
        >
          {formik.isSubmitting ? <CircularProgress size={24} /> : "Add Product"}
        </Button>
      </DialogActions>

      <SnackbarComponent />
    </Dialog>
  );
};
export default AddProductModal;
