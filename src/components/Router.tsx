import React, { useState } from 'react'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import Auth from '../routes/Auth'
import Home from '../routes/Home'

const AppRouter = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const router = createHashRouter([
    {
      path: '/',
      element: isLoggedIn ? <Home /> : <Auth />,
    },
  ])

  return <RouterProvider router={router} />
}

export default AppRouter
