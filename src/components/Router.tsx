import { createHashRouter, RouterProvider } from 'react-router-dom'
import Auth from 'routes/Auth'
import Home from 'routes/Home'

interface Props {
  isLoggedIn: boolean
}

const AppRouter = ({ isLoggedIn }: Props) => {
  const router = createHashRouter([
    {
      path: '/',
      element: isLoggedIn ? <Home /> : <Auth />,
    },
  ])

  return <RouterProvider router={router} />
}

export default AppRouter
