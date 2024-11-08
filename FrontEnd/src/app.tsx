import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { LoginSignupPage } from './pages/login-signup';
import { HomePage } from './pages/home';

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