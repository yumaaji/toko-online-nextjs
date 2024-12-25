import style from './AuthLayout.module.scss'
import Link from "next/link";

type Propstype = {
  error: string
  children: React.ReactNode
  title: string
  linkText: string
  link: string
}

const AuthLayout = (props: Propstype) => {
  const {error, children, title, linkText, link} = props
  return(
    <div className={style.auth_layout}>
      <h1 className={style.auth_layout__title}>{title}</h1>
      {error && <p className={style.auth_layout__error}>{error}</p>}
      <div className={style.auth_layout__form}>
        {children}
      <p className={style.auth_layout__link}>{linkText}<Link href={link}>here</Link></p>
      </div>
    </div>
  )
}

export default AuthLayout