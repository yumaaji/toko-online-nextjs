import { title } from 'process'
import style from './Admin.module.scss'
import Sidebar from "@/components/fragments/Sidebar"

type Propstype = {
  children: React.ReactNode
}

const listSidebarItems: {name: string, link: string, icon: string}[] = [
  {
    name: "Dashboard",
    link: "/admin",
    icon: 'bxs-dashboard',
  },
  {
    name: "Products",
    link: "/admin/products",
    icon: 'bxs-box',
  },
  {
    name: "Users",
    link: "/admin/users",
    icon: 'bxs-group',
  },

]
const AdminLayout = (props: Propstype) => {
  const {children} = props
  return(
    <div className={style.admin}>
      <Sidebar lists={listSidebarItems}/>
      <div className={style.admin__main}>{children}</div>
    </div>
  )
}

export default AdminLayout