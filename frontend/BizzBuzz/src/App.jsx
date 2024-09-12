import RoutingPage from "./routes/RoutingPage";
import Homepage from "./component/Homepage/Homepage";
import Login from "./component/Auth/Login";
import Cart from "./component/Cart/Cart";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./component/Auth/Signup";
import Profile from "./component/Profile/Profile";
import Admin from "./component/Admin/Admin";
import Complaint from "./component/Complaint/Complaint";

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
          element: <Complaint/>
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
