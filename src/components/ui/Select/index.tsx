import style from './Select.module.scss'

type Options = {
  value: string
  label: string
}

type Propstype = {
  label?: string
  name: string
  defaultValue?: string
  disabled?: boolean
  options: Options[]
}

const Select = (props: Propstype) => {
  const {label, name, options, defaultValue, disabled} = props
  return(
    <div className={style.container}>
      <label htmlFor={name}>{label}</label>
      <select name={name} defaultValue={defaultValue} disabled={disabled}>
        {options.map((option, index) => (
          <option key={option.label} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  )
}

export default Select