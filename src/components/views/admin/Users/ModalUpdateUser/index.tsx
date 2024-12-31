import { FormEvent, useState } from 'react';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input/Index';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button/Index';
import userServices from '@/services/users';

const ModalUpdateUser = (props: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const {updatedUser, setUpdatedUser, setUsersData} = props

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true)
    const form:any = event.target as HTMLFormElement;
    const data = {
      role: form.role.value,
    }
    
    try{
      const result = await userServices.updateUser(updatedUser.id, data)
      if(result.status === 200){
        setIsLoading(false)
        setUpdatedUser({})
        const {data} = await userServices.getAllUsers()
        setUsersData(data.data)
      }
    }catch(error: any){
      if(error.response && error.response.status === 400){
        setIsLoading(false)
      }
    }

  } 
  return (
    <Modal onClose={() => setUpdatedUser({})}>
      <h2>Edit User</h2>
      <form action="" onSubmit={handleSubmit}>
        <Input label='Email' type='email' name='email' defaultValue={updatedUser.email} disabled></Input>
        <Input label='Fullname' type='email' name='fullname' defaultValue={updatedUser.fullname} disabled></Input>
        <Input label='Phone' type='text' name='phone' defaultValue={updatedUser.phone} disabled></Input>
        <Select label='Role' name='role' options={[{label: 'Admin', value: 'admin'}, {label: 'Member', value: 'member'}]} defaultValue={updatedUser.role}/>
        <Button type='submit'>{isLoading ? 'Updating...' : 'Update'}</Button>
      </form>
    </Modal>
  )
}

export default ModalUpdateUser