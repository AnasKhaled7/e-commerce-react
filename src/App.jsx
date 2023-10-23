import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { Layout } from "./components";
import {
  Cart,
  Home,
  Login,
  NotFound,
  Products,
  Register,
  ResetPassword,
} from "./pages";
import UserProvider from "./context/UserProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "products", element: <Products /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "reset-password", element: <ResetPassword /> },
      { path: "cart", element: <Cart /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

const App = () => {
  return (
    <UserProvider>
      <CssBaseline />
      <RouterProvider router={router} />
    </UserProvider>
  );
};

export default App;
