import { Dispatch, useEffect, useRef } from 'react'
import style from './Modal.module.scss'

type Propstype ={
  children: React.ReactNode
  onClose: any
}

const Modal = (props: Propstype) => {
  const {children, onClose} = props
  const ref:any = useRef()
  useEffect(() => {
    const handleClickOutside = (event: any) =>{
      if(ref.current && !ref.current.contains(event.target)){
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  },[onClose, ref])
  return (
    <div className={style.modal}>
      <div className={style.modal__main} ref={ref}>
        {children}
      </div>
    </div>
  )
}

export default Modal