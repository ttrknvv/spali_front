import { Tabs } from 'antd'
import { FormCatalogProvider } from './context'
import useFormCreation from './hooks/useFormCreation'

interface IFormsCreateUpdateProps {
  isEdit?: boolean
  reloadPage: () => void
}

const FormsCreateUpdate = ({ isEdit, reloadPage }: IFormsCreateUpdateProps) => {
  const { items } = useFormCreation()

  return (
    <FormCatalogProvider value={{ isEdit, reloadPage }}>
      <Tabs destroyInactiveTabPane defaultActiveKey="1" items={items} />
    </FormCatalogProvider>
  )
}

export default FormsCreateUpdate
