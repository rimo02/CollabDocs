import './App.css'
import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'
import Layout from './Layout'
import { Navigate, RouterProvider, useNavigate } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import { Provider, useSelector } from 'react-redux'
import store from './store/store'
import Home from './pages/Home'
import LandingPage from './pages/LandingPage'
import EditorPage from './pages/EditorPage'
import { jwtDecode } from 'jwt-decode'
import { useEffect } from 'react'
import ForgotPassword from './components/ForgotPassword/ForgotPassword'
import ResetPassword from './components/ResetPassword/ResetPassword'

function isTokenValid(token) {
  if (!token) return false;
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.exp > Date.now() / 1000;
  } catch (error) {
    console.error('Error decoding token:', error);
    return false;
  }
}

function RedirectToHomeOrLanding() {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (token && isTokenValid(token)) {
      navigate('/home', { replace: true });
    }
  }, [token, navigate]);

  return <LandingPage />;
}

function ProtectedRoute({ element }) {
  const token = useSelector((state) => state.auth.token);

  if (!token || !isTokenValid(token)) {
    return <Navigate to="/" replace />;
  }

  return element;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <RedirectToHomeOrLanding /> },
      { path: "/home", element: <ProtectedRoute element={<Home />} /> },
      { path: "/editor/:id", element: <ProtectedRoute element={<EditorPage />} /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      { path: "/reset-password", element: <ResetPassword /> }
    ]
  }
])

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App;
