import { ReactNode, useState } from 'react'
import { ModalProps } from 'antd'

export interface IModalProps {
  children?: ReactNode
  title?: ReactNode
  className?: string
  width?: number
  props?: ModalProps
}

function useModal() {
  const [open, setOpen] = useState(false)
  const [modal, setModalProps] = useState<IModalProps>({})

  const setModal = (props: IModalProps) => {
    setModalProps(props)
    setOpen(true)
  }

  return { open, setOpen, modal, setModal }
}

export default useModal
