import style from './Input.module.scss'

type Propstype = {
  label?: string
  type: string
  name: string
  placehoder?: string
}

const Input = (props: Propstype) => {
  const {label, type, name, placehoder} = props
  return(
    <div className={style.login__form__item}>
      {label && <label htmlFor={name}>{label}</label>}
      <input name={name} placeholder={placehoder} id={name} type={name} className={style.login__form__item__input}/>
    </div>
  )
}

export default Input