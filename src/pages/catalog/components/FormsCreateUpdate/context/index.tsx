import React, { createContext, ReactNode, useContext } from 'react'

interface FormCatalogContextType {
  isEdit: boolean
  reloadPage: () => void
}

const FormCatalogContext = createContext<FormCatalogContextType | undefined>(undefined)

interface ProviderFormProps {
  children: ReactNode
  value: FormCatalogContextType
}

export const FormCatalogProvider: React.FC<ProviderFormProps> = ({ children, value }) => {
  return <FormCatalogContext.Provider value={value}>{children}</FormCatalogContext.Provider>
}

export const useFormCatalogContext = () => {
  return useContext(FormCatalogContext)
}
