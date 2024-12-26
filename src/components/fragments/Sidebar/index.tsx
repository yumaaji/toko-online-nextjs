import Link from 'next/link'
import style from './Sidebar.module.scss'
import { useRouter } from 'next/router'
import Button from '@/components/ui/Button/Index'
import { signOut } from 'next-auth/react'

type Propstype = {
  lists: Array<{name: string, link: string, icon: string}>
}

const Sidebar = (props: Propstype) => {
  const {lists} = props
  const {pathname} = useRouter()
  return (
    <div className={style.sidebar}>
      <div className={style.sidebar__top}>
        <h1 className={style.sidebar__top__title}>Sidebar</h1>
        <div className={style.sidebar__top__lists}>
          {lists.map((list, index) => (
            <Link href={list.link} key={list.name} className={`${style.sidebar__top__lists__items} ${pathname === list.link && style.sidebar__top__lists__items__active}`}>
              <i className={`bx ${list.icon} ${style.sidebar__top__lists__items__icon}`}/>
              <h4 className={style.sidebar__top__lists__items__name}>{list.name}</h4>
            </Link>
          ))}
        </div>
      </div>
      <div className={style.sidebar__bottom}>
        <Button type='button' onClick={() => signOut()} variant='secondary' className={style.sidebar__bottom__button}>Logout</Button>
      </div>
    </div>
  )
}

export default Sidebar