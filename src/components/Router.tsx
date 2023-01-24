import { createHashRouter, Navigate, RouterProvider } from 'react-router-dom'
import Auth from 'routes/Auth'
import Home from 'routes/Home'
import Profile from 'routes/Profile'
import Root from 'components/Root'

interface Props {
  isLoggedIn: boolean
}

const AppRouter = ({ isLoggedIn }: Props) => {
  const router = createHashRouter(
    isLoggedIn
      ? [
          {
            path: '/',
            element: <Root />,
            children: [
              { path: '/', element: <Home /> },
              { path: 'profile', element: <Profile /> },
            ],
          },
          { path: '*', element: <Navigate to='/' /> },
        ]
      : [
          { path: '/', element: <Auth /> },
          { path: '*', element: <Navigate to='/' /> },
        ]
  )

  return <RouterProvider router={router} />
}

export default AppRouter
