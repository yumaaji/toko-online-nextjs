import style from './Login.module.scss'
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import Input from '@/components/ui/Input/Index';
import Button from '@/components/ui/Button/Index';
import AuthLayout from '@/components/layouts/AuthLayout';

const LoginView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {push, query} = useRouter();
  const callbackUrl: any = query.callbackUrl || '/'

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    const form = event.target as HTMLFormElement;
    const data = {
      email: form.email.value,
      password: form.password.value
    }
    if(!data.email || !data.password){
      setIsLoading(false)
      setError("Please fill all the fields")
      return
    }

    try{
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email.value,
        password: form.password.value,
        callbackUrl
      })
      console.log(res)
      if(!res?.error){
        setIsLoading(false)
        form.reset()
        push(callbackUrl)
      }else{
        setIsLoading(false)
        setError("Email or password is incorrect")
      }
    }catch(error){
      setIsLoading(false)
      setError("Email or password is incorrect")
    }
  } 
  return (
    <AuthLayout error={error} title='Login' linkText="Don't have an account? " link="/auth/register">
      <form onSubmit={handleSubmit}>
        <Input label="Email" type="email" name="email"/>
        <Input label="Password" type="password" name="password"/>
        <Button type='submit' className={style.login__button}>{isLoading ? "Loading..." : "Login"}</Button>
      </form>
      <hr className={style.login__divider}/>
      <div>
        <Button type='button' onClick={() => signIn("google", {callbackUrl, redirect: false})} className={style.login__google}>Login with Google</Button>
      </div>
    </AuthLayout>
  )
}

export default LoginView