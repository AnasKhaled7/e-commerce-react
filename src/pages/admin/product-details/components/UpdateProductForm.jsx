import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import { useUpdateProductMutation } from "../../../../slices/products.api.slice";

const UpdateProductForm = ({
  data,
  categories,
  brands,
  showSnackbar,
  hideSnackbar,
}) => {
  const { productId } = useParams();
  const [updateProduct] = useUpdateProductMutation();

  // formik validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Category is required"),
    brand: Yup.string().required("Brand is required"),
    price: Yup.number().required("Price is required"),
    countInStock: Yup.number().required("Count in stock is required"),
    discount: Yup.number(),
  });

  // formik submit handler
  const onSubmit = async (values) => {
    hideSnackbar();
    try {
      const changedValues = {};
      for (const key in values) {
        if (values[key] !== formik.initialValues[key]) {
          changedValues[key] = values[key];
        }
      }

      if (Object.keys(changedValues).length === 0) {
        showSnackbar("Nothing to update", "info");
        return;
      }

      await updateProduct({
        productId,
        product: changedValues,
      }).unwrap();

      showSnackbar("Product updated successfully", "success");
    } catch (error) {
      console.log(error);
      showSnackbar(error?.data?.message || error.error, "error");
    }
  };

  // formik hook
  const formik = useFormik({
    initialValues: {
      name: data?.product?.name || "",
      description: data?.product?.description || "",
      category: data?.product?.category?._id || "",
      brand: data?.product?.brand?._id || "",
      price: data?.product?.price || "",
      countInStock: data?.product?.countInStock || "",
      discount: data?.product?.discount || "",
    },
    validationSchema,
    onSubmit,
    enableReinitialize: true,
  });

  return (
    <Paper
      variant="outlined"
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        p: { xs: 2, sm: 4 },
        display: "flex",
        flexDirection: "column",
        gap: 4,
        width: "100%",
      }}
    >
      {/* heading */}
      <Typography variant="h5" component="h3" textAlign="center">
        Edit Product
      </Typography>

      {/* name */}
      <TextField
        required
        id="edit-product-name"
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
        id="edit-product-description"
        name="description"
        label="Description"
        value={formik.values.description}
        onChange={formik.handleChange}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
        multiline
        rows={6}
      />

      {/* category */}
      <FormControl
        required
        fullWidth
        error={formik.touched.category && Boolean(formik.errors.category)}
      >
        <InputLabel id="edit-product-category-label">Category</InputLabel>
        <Select
          name="category"
          labelId="edit-product-category-label"
          id="edit-product-category"
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

      {/* brand */}
      <FormControl
        required
        fullWidth
        error={formik.touched.brand && Boolean(formik.errors.brand)}
      >
        <InputLabel id="edit-product-brand-label">Brand</InputLabel>
        <Select
          name="brand"
          labelId="edit-product-brand-label"
          id="edit-product-brand"
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

      {/* price */}
      <TextField
        required
        id="edit-product-price"
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
        id="edit-product-count-in-stock"
        name="countInStock"
        label="Count in stock"
        type="number"
        value={formik.values.countInStock}
        onChange={formik.handleChange}
        error={
          formik.touched.countInStock && Boolean(formik.errors.countInStock)
        }
        helperText={formik.touched.countInStock && formik.errors.countInStock}
      />

      {/* discount */}
      <TextField
        id="edit-product-discount"
        name="discount"
        label="Discount"
        type="number"
        value={formik.values.discount}
        onChange={formik.handleChange}
        error={formik.touched.discount && Boolean(formik.errors.discount)}
        helperText={formik.touched.discount && formik.errors.discount}
      />

      {/* submit button */}
      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}
      >
        {formik.isSubmitting ? <CircularProgress size={24} /> : "Update"}
      </Button>
    </Paper>
  );
};
export default UpdateProductForm;
