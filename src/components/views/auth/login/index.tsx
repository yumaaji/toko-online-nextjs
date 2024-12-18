import { FormEvent, useState } from 'react';
import style from './Login.module.scss'
import Link from "next/link";
import { useRouter } from 'next/router';
import { redirect } from 'next/dist/server/api-utils';
import { signIn } from 'next-auth/react';

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
    <div className={style.login}>
      <h1 className={style.login__title}>login</h1>
      {error && <p className={style.login__error}>{error}</p>}
      <div  className={style.login__form}>
        <form onSubmit={handleSubmit}>
          <div className={style.login__form__item}>
            <label htmlFor="email">Email</label>
            <input name='email' id='email' type="email" className={style.login__form__item__input}/>
          </div>
          <div className={style.login__form__item}>
            <label htmlFor="password">Password</label>
            <input name='password' id='password' type="password" className={style.login__form__item__input}/>
          </div>
          <button type='submit' className={style.login__form__button}>{isLoading ? "Loading..." : "Login"}</button>
        </form>
        <hr className={style.login__form__divider}/>
        <div>
          <button type='button' className={style.login__form__google} onClick={() => signIn("google", {callbackUrl, redirect: false})}>Login with Google</button>
          <p className={style.login__form__link}>Don{"'"}t have an account? <Link href="/auth/register">Sign Up</Link></p>
        </div>
      </div>
    </div>
  )
}

export default LoginView