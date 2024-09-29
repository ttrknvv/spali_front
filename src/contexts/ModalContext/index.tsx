import { Dispatch, ReactNode, SetStateAction, createContext } from 'react'
import { Modal } from 'antd'
import useModal, { IModalProps } from 'hooks/useModal'

export type ModalContextValue = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  setModal: (props: IModalProps) => void
  modal: IModalProps
}

const ModalContext = createContext<ModalContextValue>({ open: false, setOpen: () => {}, setModal: () => {}, modal: {} })
const { Provider } = ModalContext

const ModalProvider = ({ children }: { children: ReactNode }) => {
  const { open, setOpen, modal, setModal } = useModal()

  return (
    <Provider value={{ open, setOpen, setModal, modal }}>
      <Modal
        className={modal?.className}
        centered
        open={open}
        destroyOnClose
        width={modal?.width}
        footer=""
        title={modal?.title}
        onCancel={() => {
          setOpen(false)
        }}
        {...modal.props}>
        {modal?.children}
      </Modal>
      {children}
    </Provider>
  )
}

export { ModalContext, ModalProvider }
