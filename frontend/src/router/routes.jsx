import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import GuestLayout from "@Layout/GuestLayout";
import Users from "@/pages/Admin/Users";
import DefaultLayout from "@Layout/DefaultLayout";
import NotFound from "@/components/NotFound404/Notfound";
import Dashboard from "@/pages/Dashboard";
import Permissions from "@/pages/Admin/Permissions";
import Roles from "@/pages/Admin/Roles";
const router = createBrowserRouter([
    {
        path: "/",
        element:<DefaultLayout />,
        children:[
            {
                path: "/",
                element: <Navigate to="/dashboard" />,
            },
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
          {
            path: "/users",
            element: <Users />,
          },
          {
            path: "/permissions",
            element: <Permissions />,
          },
          {
            path: "/roles",
            element: <Roles />,
          },
     
        ]
        
      },
  {
    
    
    path: "/",
    element:<GuestLayout />,
    children:[
        {
            path: "/",
            element: <Navigate to="/login" />,
        },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    
    ]
    
  },
  {
    path: "*",
    element: <NotFound />,
  }
 
]);

export default router;
