import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { LoginSignupPage } from './pages/login-signup';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginSignupPage />
  }
])

  export function App() { 
    return <RouterProvider router={router} />;
  }