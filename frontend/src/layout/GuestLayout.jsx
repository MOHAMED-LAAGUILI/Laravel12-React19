import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../context/ContextProvider';
import { Toaster } from 'react-hot-toast';

export default function GuestLayout() {
    const { user, token } = useStateContext();


    if (user && token) {
        return <Navigate to="/" />;
    }
  return (
    <div>
              <Toaster />

    

        <main>
            <Outlet />
        </main>

      
    </div>
  )
}
