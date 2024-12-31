import { useState } from 'react'
import style from './ModalDeleteUser.module.scss'
import userServices from "@/services/users";
import Modal from "@/components/ui/Modal"
import Button from '@/components/ui/Button/Index';

const ModalDeleteUser = (props: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const {deletedUser, setDeletedUser, setUsersData} = props
  console.log(setDeletedUser)

  const handleDelete = async () => {
    setIsLoading(true)

    try{
      const result = await userServices.deleteUser(deletedUser.id)
      if(result.status === 200){
        setDeletedUser({})
        const{data} = await userServices.getAllUsers()
        setUsersData(data.data)
        
      }
    }catch(error: any){
      if(error.response && error.response.status === 400){
        console.log(error)
      }
    }

  }
  return (  
    <Modal onClose={() => setDeletedUser({})}>
      <div className={style.container}>
        <h2>Delete User</h2>
        <p>Are you sure you want to delete this user?</p>
        <p>{`${deletedUser.fullname}`}</p>
        <Button type="button" onClick={() => handleDelete()}>{isLoading ? 'Deleting...' : 'Delete'}</Button>
      </div>
    </Modal>
  )
}

export default ModalDeleteUser