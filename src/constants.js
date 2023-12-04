export const BASE_URL =
  process.env.REACT_APP_ENV === "production"
    ? "https://nile-node.vercel.app"
    : "";

export const API_URL = `${BASE_URL}/api/v1`;

export const AUTH_URL = `${API_URL}/auth`;
export const USERS_URL = `${API_URL}/users`;
export const CATEGORIES_URL = `${API_URL}/categories`;
export const BRANDS_URL = `${API_URL}/brands`;
export const PRODUCTS_URL = `${API_URL}/products`;
export const REVIEWS_URL = `${API_URL}/reviews`;
export const CARTS_URL = `${API_URL}/carts`;
export const ORDERS_URL = `${API_URL}/orders`;
