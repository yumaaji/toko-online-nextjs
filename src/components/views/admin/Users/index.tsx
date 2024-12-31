import { useEffect, useState } from "react";
import style from './Users.module.scss'
import AdminLayout from "@/components/layouts/AdminLayout"
import Button from '@/components/ui/Button/Index';
import ModalUpdateUser from "./ModalUpdateUser";
import ModalDeleteUser from "./ModalDeleteUser";

type Propstype = {
  users: any
}

const UsersAdminView = (props: Propstype) => {
  const {users} = props
  const [usersData, setUsersData] = useState([])
  const [updatedUser, setUpdatedUser] = useState({})
  const [deletedUser, setDeletedUser] = useState({})

  useEffect(() => {
    setUsersData(users)
  }, [users])

  return(
    <>
      <AdminLayout>
        <h1>Users Management</h1>
        <div className={style.users}>
          <table className={style.users__table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((user: any, index: number) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.fullname}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <div className={style.users__table__actions}>
                      <Button type="button" onClick={(() => setUpdatedUser(user))}><i className='bx bx-edit-alt'/></Button>
                      <Button type="button" onClick={(() => setDeletedUser(user))}><i className='bx bxs-trash'/></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
      {Object.keys(updatedUser).length && (
        <ModalUpdateUser updatedUser={updatedUser} setUpdatedUser={setUpdatedUser} setUsersData={setUsersData}/>
      )}
      {Object.keys(deletedUser).length && (
        <ModalDeleteUser deletedUser={deletedUser} setDeletedUser={setDeletedUser} setUsersData={setUsersData}/>
      )}
    </>
  )
}
export default UsersAdminView