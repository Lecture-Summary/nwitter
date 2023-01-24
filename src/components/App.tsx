import { useState } from 'react'
import AppRouter from 'components/Router'
import { authService } from 'fbase'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'

function App() {
  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
      setInit(true)
    })
  }, [])

  return (
    <>
      {init ? <AppRouter isLoggedIn={Boolean(isLoggedIn)} /> : 'Initializing'}
    </>
  )
}

export default App
