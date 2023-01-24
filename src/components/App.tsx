import { useState } from 'react'
import AppRouter from 'components/Router'
import { authService } from 'fbase'

function App() {
  const [isLoggedIn] = useState(authService.currentUser)

  return (
    <>
      <AppRouter isLoggedIn={Boolean(isLoggedIn)} />
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  )
}

export default App
