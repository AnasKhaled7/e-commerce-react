import * as Yup from "yup";

// register
export const registerValidation = Yup.object()
  .shape({
    firstName: Yup.string()
      .min(3, "Too Short!")
      .max(30, "Too Long!")
      .trim()
      .required("First name is required"),
    lastName: Yup.string()
      .min(3, "Too Short!")
      .max(30, "Too Long!")
      .trim()
      .required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .trim()
      .lowercase()
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .max(50, "Password must be at most 50 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
    phone: Yup.string()
      .matches(
        /^01[0-2,5]{1}[0-9]{8}$/,
        "Phone number must start with 010, 011, 012, or 015 and be 11 digits long."
      )
      .trim()
      .required("Phone number is required"),
  })
  .required();

// login
export const loginValidation = Yup.object()
  .shape({
    email: Yup.string()
      .email("Invalid email address")
      .trim()
      .lowercase()
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .max(50, "Password must be at most 50 characters")
      .required("Password is required"),
  })
  .required();

// add review
export const reviewValidation = Yup.object()
  .shape({
    rating: Yup.number().min(1).max(5).required("Rating is required"),
    comment: Yup.string().trim(),
  })
  .required();

// profile
export const profileValidation = Yup.object()
  .shape({
    firstName: Yup.string()
      .min(3, "Too Short!")
      .max(30, "Too Long!")
      .trim()
      .required("First name is required"),
    lastName: Yup.string()
      .min(3, "Too Short!")
      .max(30, "Too Long!")
      .trim()
      .required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .trim()
      .lowercase()
      .required("email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .max(50, "Password must be at most 50 characters"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
    address: Yup.string().trim().required("Address is required"),
    city: Yup.string().trim().required("City is required"),
    postalCode: Yup.string()
      .trim()
      .length(5, "Postal Code must be 5 characters")
      .required("Postal code is required"),
    phone: Yup.string()
      .trim()
      .matches(
        /^01[0-2,5]{1}[0-9]{8}$/,
        "Phone number must start with 010, 011, 012, or 015 and be 11 digits long."
      )
      .required("Phone number is required"),
  })
  .required();

// email
export const emailValidation = Yup.object()
  .shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("email is required"),
  })
  .required();

// reset password
export const resetPasswordValidation = Yup.object()
  .shape({
    email: Yup.string()
      .email("Invalid email address")
      .trim()
      .lowercase()
      .required("email is required"),
    code: Yup.string().trim().required("Code is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .max(50, "Password must be at most 50 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  })
  .required();

// shipping
export const shippingValidation = Yup.object()
  .shape({
    address: Yup.string().trim().required("Address is required"),
    city: Yup.string().trim().required("City is required"),
    postalCode: Yup.string()
      .trim()
      .length(5, "Postal Code must be 5 characters")
      .required("Postal code is required"),
    phone: Yup.string()
      .trim()
      .matches(
        /^01[0-2,5]{1}[0-9]{8}$/,
        "Phone number must start with 010, 011, 012, or 015 and be 11 digits long."
      )
      .required("Phone number is required"),
  })
  .required();
