import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { HomePage } from './pages/home';
import { LoginSignupPage } from './pages/login-signup';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginSignupPage />
  },

  {
    path: '/home',
    element: <HomePage />
  }
])

  export function App() { 
    return <RouterProvider router={router} />;
  }