import { useState, useEffect } from "react"
import userServices from '../../../services/users/index';
import AdminUsersView from "@/components/views/admin/Users"

const AdminUsersPage = () => {
  const [usersData, setUsersData] = useState([])

  useEffect(() => {
    const getAllUser = async () =>{
      const{data} = await userServices.getAllUsers()
      setUsersData(data.data)
    }
    getAllUser()
  },[])

  return(
    <AdminUsersView users={usersData}/>
  )
}

export default AdminUsersPage