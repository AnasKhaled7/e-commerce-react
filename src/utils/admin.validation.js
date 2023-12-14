import * as Yup from "yup";

// add brand | add category
export const nameAndImageValidation = Yup.object()
  .shape({
    name: Yup.string().trim().required("Name is required"),
    image: Yup.mixed()
      .test(
        "fileSize",
        "File too large",
        (value) => value && value.size <= 1048576
      ) // 1MB
      .test(
        "fileFormat",
        "Unsupported Format",
        (value) =>
          value && ["image/jpg", "image/jpeg", "image/png"].includes(value.type)
      )
      .required("An image is required"),
  })
  .required();

// add brand image | add category image | add product image
export const imageValidation = Yup.object()
  .shape({
    image: Yup.mixed()
      .test(
        "fileSize",
        "File too large",
        (value) => value && value.size <= 1048576
      ) // 1MB
      .test(
        "fileFormat",
        "Unsupported Format",
        (value) =>
          value && ["image/jpg", "image/jpeg", "image/png"].includes(value.type)
      )
      .required("An image is required"),
  })
  .required();

// add brand name | add category name
export const nameValidation = Yup.object()
  .shape({
    name: Yup.string().trim().required("Name is required"),
  })
  .required();

// add product
export const addProductValidation = Yup.object()
  .shape({
    name: Yup.string().trim().required("Name is required"),
    description: Yup.string().trim().required("Description is required"),
    price: Yup.number().required("Price is required"),
    countInStock: Yup.number().required("Count in stock is required"),
    category: Yup.string().required("Category is required"),
    brand: Yup.string().required("Brand is required"),
    discount: Yup.number(),
    image: Yup.mixed()
      .test(
        "fileSize",
        "File too large",
        (value) => value && value.size <= 1048576
      ) // 1MB
      .test(
        "fileFormat",
        "Unsupported Format",
        (value) =>
          value && ["image/jpg", "image/jpeg", "image/png"].includes(value.type)
      )
      .required("An image is required"),
  })
  .required();

// update product
export const updateProductValidation = Yup.object()
  .shape({
    name: Yup.string().trim().required("Name is required"),
    description: Yup.string().trim().required("Description is required"),
    price: Yup.number().required("Price is required"),
    countInStock: Yup.number().required("Count in stock is required"),
    category: Yup.string().required("Category is required"),
    brand: Yup.string().required("Brand is required"),
    discount: Yup.number(),
  })
  .required();

// block user
export const blockUserValidation = Yup.object()
  .shape({
    reason: Yup.string().trim().required("Reason is required"),
  })
  .required();
