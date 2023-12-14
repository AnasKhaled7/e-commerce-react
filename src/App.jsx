import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Suspense, lazy } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { CssBaseline } from "@mui/material";

import { Layout, LoadingScreen, PrivateRoute } from "./components";

const AdminLayout = lazy(() =>
  import("./pages/admin/admin-layout/AdminLayout")
);
const BrandDetails = lazy(() =>
  import("./pages/admin/brand-details/BrandDetails")
);
const BrandsList = lazy(() => import("./pages/admin/brands-list/BrandsList"));
const Cart = lazy(() => import("./pages/cart/Cart"));
const Categories = lazy(() => import("./pages/categories/Categories"));
const CategoriesList = lazy(() =>
  import("./pages/admin/categories-list/CategoriesList")
);
const CategoryDetails = lazy(() =>
  import("./pages/admin/category-details/CategoryDetails")
);
const CategoryProducts = lazy(() =>
  import("./pages/category-products/CategoryProducts")
);
const Dashboard = lazy(() => import("./pages/admin/dashboard/Dashboard"));
const Home = lazy(() => import("./pages/home/Home"));
const Login = lazy(() => import("./pages/login/Login"));
const MyOrders = lazy(() => import("./pages/my-orders/MyOrders"));
const NotFound = lazy(() => import("./pages/not-found/NotFound"));
const Order = lazy(() => import("./pages/order/Order"));
const OrdersList = lazy(() => import("./pages/admin/orders-list/OrdersList"));
const PlaceOrder = lazy(() => import("./pages/place-order/PlaceOrder"));
const Product = lazy(() => import("./pages/product/Product"));
const ProductDetails = lazy(() =>
  import("./pages/admin/product-details/ProductDetails")
);
const Products = lazy(() => import("./pages/products/Products"));
const ProductsList = lazy(() =>
  import("./pages/admin/products-list/ProductsList")
);
const Profile = lazy(() => import("./pages/profile/Profile"));
const Register = lazy(() => import("./pages/register/Register"));
const ResetPassword = lazy(() =>
  import("./pages/reset-password/ResetPassword")
);
const Shipping = lazy(() => import("./pages/shipping/Shipping"));
const UsersList = lazy(() => import("./pages/admin/users-list/UsersList"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route
        index
        element={
          <Suspense fallback={<LoadingScreen />}>
            <Home />
          </Suspense>
        }
      />
      <Route
        path="categories/page/:page"
        element={
          <Suspense fallback={<LoadingScreen />}>
            <Categories />
          </Suspense>
        }
      />
      <Route
        path="products/page/:page"
        element={
          <Suspense fallback={<LoadingScreen />}>
            <Products />
          </Suspense>
        }
      />
      <Route
        path="products/category/:categoryId/page/:page"
        element={
          <Suspense fallback={<LoadingScreen />}>
            <CategoryProducts />
          </Suspense>
        }
      />
      <Route
        path="products/:productId"
        element={
          <Suspense fallback={<LoadingScreen />}>
            <Product />
          </Suspense>
        }
      />
      <Route
        path="register"
        element={
          <Suspense fallback={<LoadingScreen />}>
            <Register />
          </Suspense>
        }
      />
      <Route
        path="login"
        element={
          <Suspense fallback={<LoadingScreen />}>
            <Login />
          </Suspense>
        }
      />
      <Route
        path="reset-password"
        element={
          <Suspense fallback={<LoadingScreen />}>
            <ResetPassword />
          </Suspense>
        }
      />
      <Route
        path="cart"
        element={
          <Suspense fallback={<LoadingScreen />}>
            <Cart />
          </Suspense>
        }
      />

      <Route path="" element={<PrivateRoute />}>
        <Route
          path="shipping"
          element={
            <Suspense fallback={<LoadingScreen />}>
              <Shipping />
            </Suspense>
          }
        />
        <Route
          path="place-order"
          element={
            <Suspense fallback={<LoadingScreen />}>
              <PlaceOrder />
            </Suspense>
          }
        />
        <Route
          path="orders/:orderId"
          element={
            <Suspense fallback={<LoadingScreen />}>
              <Order />
            </Suspense>
          }
        />
        <Route
          path="profile"
          element={
            <Suspense fallback={<LoadingScreen />}>
              <Profile />
            </Suspense>
          }
        />
        <Route
          path="my-orders"
          element={
            <Suspense fallback={<LoadingScreen />}>
              <MyOrders />
            </Suspense>
          }
        />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route
          index
          element={
            <Suspense fallback={<LoadingScreen />}>
              <Dashboard />
            </Suspense>
          }
        />
        <Route
          path="users-list"
          element={
            <Suspense fallback={<LoadingScreen />}>
              <UsersList />
            </Suspense>
          }
        />
        <Route
          path="orders-list"
          element={
            <Suspense fallback={<LoadingScreen />}>
              <OrdersList />
            </Suspense>
          }
        />
        <Route
          path="orders-list/:orderId"
          element={
            <Suspense fallback={<LoadingScreen />}>
              <Order />
            </Suspense>
          }
        />
        <Route
          path="products-list"
          element={
            <Suspense fallback={<LoadingScreen />}>
              <ProductsList />
            </Suspense>
          }
        />
        <Route
          path="products-list/:productId"
          element={
            <Suspense fallback={<LoadingScreen />}>
              <ProductDetails />
            </Suspense>
          }
        />
        <Route
          path="brands-list"
          element={
            <Suspense fallback={<LoadingScreen />}>
              <BrandsList />
            </Suspense>
          }
        />
        <Route
          path="brands-list/:brandId"
          element={
            <Suspense fallback={<LoadingScreen />}>
              <BrandDetails />
            </Suspense>
          }
        />
        <Route
          path="categories-list"
          element={
            <Suspense fallback={<LoadingScreen />}>
              <CategoriesList />
            </Suspense>
          }
        />
        <Route
          path="categories-list/:categoryId"
          element={
            <Suspense fallback={<LoadingScreen />}>
              <CategoryDetails />
            </Suspense>
          }
        />
      </Route>
      <Route
        path="*"
        element={
          <Suspense fallback={<LoadingScreen />}>
            <NotFound />
          </Suspense>
        }
      />
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
