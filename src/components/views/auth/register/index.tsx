import style from './Register.module.scss'
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import Input from '@/components/ui/Input/Index';
import Button from '@/components/ui/Button/Index';
import authServices from '@/services/auth';
import AuthLayout from '@/components/layouts/AuthLayout';

const RegisterView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const {push} = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true)
    setError("");
    // get form elements
    const form = event.target as HTMLFormElement;
    const data = {
      email: form.email.value,
      fullname: form.fullname.value,
      phone: form.phone.value,
      password: form.password.value
    }

    if(!data.email || !data.fullname || !data.phone || !data.password){
      setIsLoading(false)
      setError("Please fill all the fields")
      return
    }

    // send to api
    try{
      const result = await authServices.registerAccount(data)
      if(result.status === 200){
        setIsLoading(false)
        form.reset()
        push('/auth/login')
      }
    }catch(error: any){
      if(error.response && error.response.status === 400){
        setIsLoading(false)
        setError("Email already exists")
      }
    }

  } 
  return (
    <AuthLayout error={error} title="Register" linkText="Already have an account, sign in " link="/auth/login">
      <form onSubmit={handleSubmit}>
        <Input label='Email' type='email' name='email'></Input>
        <Input label='Fullname' type='email' name='fullname'></Input>
        <Input label='Phone' type='text' name='phone'></Input>
        <Input label='Password' type='password' name='password'></Input>
        <Button type='submit' className={style.register__button}>{isLoading ? "Loading..." : "Register"}</Button>
      </form>
    </AuthLayout>
  )
}

export default RegisterView