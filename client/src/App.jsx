import './App.css'
import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'
import Layout from './Layout'
import { RouterProvider } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store'
import Home from './pages/Home'
import LandingPage from './pages/LandingPage'
import EditorPage from './pages/EditorPage'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/home", element: <Home /> },
      { path: "/editor/:id", element: <EditorPage /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> }
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

export default App
