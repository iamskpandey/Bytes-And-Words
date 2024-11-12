import "./App.css";
import Homepage from "./components/homepage/Homepage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./components/auth/Login";
import { Signup } from "./components/auth/Signup";
import Createpage from "./components/create/Createpage";
import Blogpage from "./components/blog/Blogpage";
import Dashboard from "./components/dashboard/Dashboard";
import CategoriesSearch from "./components/homepage/CategoriesSearch";
import Protected from "./components/Protected";
import Editpage from "./components/edit/Editpage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
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
      path: "/create",
      element: (
        <Protected>
          <Createpage />
        </Protected>
      ),
    },
    {
      path: "/blog/:blogId",
      element: <Blogpage />,
    },
    {
      path: "/dashboard",
      element: (
        <Protected>
          <Dashboard />
        </Protected>
      ),
    },
    {
      path: "/category",
      element: <CategoriesSearch />,
    },
    {
      path:"/edit/:blogId",
      element:(
        <Protected>
          <Editpage />
        </Protected>
      )
    }
  ]);
  return <RouterProvider router={router} />;
}

export default App;
