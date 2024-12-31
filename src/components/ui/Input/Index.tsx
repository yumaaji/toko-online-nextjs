import style from './Input.module.scss'

type Propstype = {
  label?: string
  type: string
  name: string
  placehoder?: string
  defaultValue?: string
  disabled?: boolean
}

const Input = (props: Propstype) => {
  const {label, type, name, placehoder, defaultValue, disabled} = props
  return(
    <div className={style.container}>
      {label && <label htmlFor={name}>{label}</label>}
      <input name={name} placeholder={placehoder} id={name} type={type} className={style.login__form__item__input} defaultValue={props.defaultValue} disabled={props.disabled} />
    </div>
  )
}

export default Input