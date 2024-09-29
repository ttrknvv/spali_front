export interface ICategory {
  id: number
  name: string
  isOnlySubcat: boolean
}

export interface ISubCategory {
  id: number
  name: string
  desccription?: string
  topics?: ITopic[]
}

export interface ITopic {
  id: number
  name: string
  desccription?: string
}

export interface ICategoryRecursive extends ICategory {
  subCategories: ISubCategory[]
}
