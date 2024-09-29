export interface ListResponse<T> {
  pageCount: number
  pageNumber: number
  totalCount: number
  items: T[]
}
