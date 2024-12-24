import { FormEvent, useState } from 'react';
import style from './Register.module.scss'
import Link from "next/link";
import { useRouter } from 'next/router';
import Input from '@/components/ui/Input/Index';
import Button from '@/components/ui/Button/Index';

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
    const result = await fetch("/api/user/register", {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    const response = await result.json()
    // handle response
    if(result.status === 200){
      setIsLoading(false)
      form.reset()
      push('/auth/login')
    }else{
      setIsLoading(false)
      setError(response.message || "Email telah terdaftar")
    }
  } 
  return (
    <div className={style.register}>
      <h1 className={style.register__title}>Register</h1>
      {error && <p className={style.register__error}>{error}</p>}
      <div  className={style.register__form}>
        <form onSubmit={handleSubmit}>
          <Input label='Email' type='email' name='email'></Input>
          <Input label='Fullname' type='email' name='fullname'></Input>
          <Input label='Phone' type='text' name='phone'></Input>
          <Input label='Password' type='password' name='password'></Input>
          <Button type='submit' className={style.register__form__button}>{isLoading ? "Loading..." : "Register"}</Button>
          <p className={style.register__form__link}>Already have an account? <Link href="/auth/login">Sign in</Link></p>
        </form>
      </div>
    </div>
  )
}

export default RegisterView