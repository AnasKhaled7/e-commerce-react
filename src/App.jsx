import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { AdminRoute, Layout, PrivateRoute } from "./components";
import {
  Cart,
  CategoryProducts,
  Home,
  Login,
  MyOrders,
  NotFound,
  Order,
  OrdersList,
  PlaceOrder,
  Product,
  ProductDetails,
  Products,
  ProductsList,
  Profile,
  Register,
  ResetPassword,
  Shipping,
  UsersList,
} from "./pages";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="products" element={<Products />} />
      <Route
        path="products/category/:categoryId"
        element={<CategoryProducts />}
      />
      <Route path="products/:productId" element={<Product />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="reset-password" element={<ResetPassword />} />
      <Route path="cart" element={<Cart />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="shipping" element={<Shipping />} />
        <Route path="place-order" element={<PlaceOrder />} />
        <Route path="orders/:orderId" element={<Order />} />
        <Route path="profile" element={<Profile />} />
        <Route path="my-orders" element={<MyOrders />} />
      </Route>

      <Route path="/admin" element={<AdminRoute />}>
        <Route path="orders-list" element={<OrdersList />} />
        <Route path="orders-list/:orderId" element={<Order />} />
        <Route path="products-list" element={<ProductsList />} />
        <Route path="products-list/:productId" element={<ProductDetails />} />
        <Route path="users-list" element={<UsersList />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

const App = () => {
  return (
    <CssBaseline>
      <RouterProvider router={router} />
    </CssBaseline>
  );
};

export default App;
