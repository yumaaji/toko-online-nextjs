import { addData, retriveDataByField } from '@/lib/firebase/service';
import bcrypt from 'bcrypt'

export async function signUp(
  userData: {
    email: string;
    fullname: string;
    phone: string;
    password: string;
    role?: string;
    created_at?: string;
    updated_at?: string;
  }, callback: Function){
    const data = await retriveDataByField('users', 'email', userData.email)

  if(data.length > 0){
    callback(false)
  }else{
    if(!userData.role){
      userData.role = 'member'
    }
    userData.password = await bcrypt.hash(userData.password, 10)
    userData.created_at = new Date().toISOString()
    userData.updated_at = new Date().toISOString()
    await addData('users', userData, (result: boolean) => {
      callback(result)
    })
  }
}

export async function signIn(email: string) {
  const data = await retriveDataByField('users', 'email', email)
  if(data){
    return data[0]
  }else{
    return null
  }
}

export async function loginWithGoogle(data:{email: string, role?: string}, callback: Function){
  const user = await retriveDataByField('users', 'email', data.email)
  
  if(user.length > 0){
    callback(user[0])
  }else{
    data.role = "member"
    await addData('users', data, (result: boolean) => {
      if(result){
        callback(data)
      }
    })
  }
}
