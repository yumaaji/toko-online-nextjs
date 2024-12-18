import { FormEvent, useState } from 'react';
import style from './Register.module.scss'
import Link from "next/link";
import { useRouter } from 'next/router';

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
          <div className={style.register__form__item}>
            <label htmlFor="email">Email</label>
            <input name='email' id='email' type="email" className={style.register__form__item__input}/>
          </div>
          <div className={style.register__form__item}>
            <label htmlFor="fullname">Fullname</label>
            <input name='fullname' id='fullname' type="text" className={style.register__form__item__input}/>
          </div>
          <div className={style.register__form__item}>
            <label htmlFor="phone">Phone</label>
            <input name='phone' id='phone' type="text" className={style.register__form__item__input}/>
          </div>
          <div className={style.register__form__item}>
            <label htmlFor="password">Password</label>
            <input name='password' id='password' type="password" className={style.register__form__item__input}/>
          </div>
          <button type='submit' className={style.register__form__button}>{isLoading ? "Loading..." : "Register"}</button>
          <p className={style.register__form__link}>Already have an account? <Link href="/auth/login">Sign in</Link></p>
        </form>
      </div>
    </div>
  )
}

export default RegisterView