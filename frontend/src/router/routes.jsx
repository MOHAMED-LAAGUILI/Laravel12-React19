import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import GuestLayout from "@Layout/GuestLayout";
import Users from "@/pages/users/Users";
import DefaultLayout from "@Layout/DefaultLayout";
import NotFound from "@/components/NotFound404/Notfound";
import Dashboard from "@/pages/users/Dashboard";
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
