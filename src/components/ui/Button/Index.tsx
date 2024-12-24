import style from './Button.module.scss'

type Propstype = {
  type: 'submit' | 'button' | 'reset' | undefined
  onClick?: () => void
  children?: React.ReactNode
  variant?: string
  className?: string
}

const Button = (props: Propstype) => {
  const {children, type, onClick, variant = 'primary', className} = props

  return (
    <button type={type} onClick={onClick} className={`${style.button} ${style[variant]} ${className}`}>
      {children}
    </button>
  )
}

export default Button