import { signIn, signOut, useSession } from "next-auth/react"
import style from './Navbar.module.scss'

const Navbar = () => {
  const {data} = useSession()

  return (
    <div className={style.navbar}>
      <button className={style.navbar__button} onClick={() => data ? signOut() : signIn()}>
        {data? 'Logout' : 'Sign in'}
      </button>
    </div>
  )
}

export default Navbar