import RoutingPage from "./routes/RoutingPage";
import Homepage from "./component/Homepage/Homepage";
import Login from "./component/Auth/Login";
import Cart from "./component/Cart/Cart";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./component/Auth/Signup";
import Profile from "./component/Profile/Profile";
import Admin from "./component/Admin/Admin";
import Complaint from "./component/Complaint/Complaint";
import AddProduct from "./component/AddProduct/AddProduct";
import EditProduct from "./component/AddProduct/EditProduct";
import EditProductForm from "./component/AddProduct/EditProductForm";
import Checkout from "./component/Cart/Checkout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RoutingPage />,
      children: [
        {
          path: "/",
          element: <Homepage />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },

        {
          path: "/admin",
          element: <Admin />,
        },
        {
          path: "/compalint",
          element: <Complaint />,
        },
        {
          path: "/add_product",
          element: <AddProduct />,
        },

        {
          path: "/edit_product",
          element: <EditProduct />,
        },
        {
          path: "/edit_product/:id",
          element: <EditProductForm />,
        },
        {
          path: "/checkout",
          element: <Checkout />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
