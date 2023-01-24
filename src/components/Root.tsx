import { Outlet } from 'react-router-dom'
import Navigation from 'components/Navigation'

const Root = () => {
  return (
    <>
      <Navigation />
      <Outlet />
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  )
}

export default Root
