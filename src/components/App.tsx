import { useState } from 'react'
import AppRouter from 'components/Router'
import { authService } from 'fbase'
import { useEffect } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'

function App() {
  const [init, setInit] = useState(false)
  const [userObj, setUserObj] = useState<User | null>(null)
  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setUserObj(user)
      }
      setInit(true)
    })
  }, [])

  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />
      ) : (
        'Initializing'
      )}
    </>
  )
}

export default App
