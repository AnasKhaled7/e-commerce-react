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
import { Layout, PrivateRoute } from "./components";
import {
  Cart,
  Home,
  Login,
  NotFound,
  Order,
  PlaceOrder,
  Product,
  Products,
  Register,
  ResetPassword,
  Shipping,
} from "./pages";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="products" element={<Products />} />
      <Route path="products/:productId" element={<Product />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="reset-password" element={<ResetPassword />} />
      <Route path="cart" element={<Cart />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="shipping" element={<Shipping />} />
        <Route path="place-order" element={<PlaceOrder />} />
        <Route path="orders/:orderId" element={<Order />} />
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
