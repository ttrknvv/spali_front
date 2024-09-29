import { $api } from './api'
import { ICategory, ICategoryRecursive, ITopic } from 'models/Category'
import { ListResponse } from 'models/ListResponse'

export const api = {
  getPermissions: (token?: string) =>
    $api.get('auth/permissions', token ? { headers: { Authorization: `Bearer ${token}` } } : {}),

  getCategories: (params?: any) => $api.get<ICategory[]>(`category/`, { params }),
  getSubCategories: (params?: any) => $api.get<ICategory[]>(`category/subcat`, { params }),
  getTopics: (params?: any) => $api.get<ITopic[]>(`category/subcat/topic`, { params }),
  getCategoriesListRecursive: (params: any) =>
    $api.get<ListResponse<ICategoryRecursive>>(`category/recursive`, { params }),
  createCategory: (data: any) => $api.post(`/category`, data),
  editCategory: (data: any, id: number) => $api.put(`/category/${id}`, data),
  createSubCategory: (idCategory: number, data: any) => $api.post(`/category/${idCategory}/subcat`, data),
  editSubCategory: (data: any, id: number) => $api.put(`/category/subcat/${id}`, data),
  createTopic: (idSubCategory: number, data: any) => $api.post(`/category/subcat/${idSubCategory}/topic`, data),
  editTopic: (data: any, id: number) => $api.put(`/category/subcat/topic/${id}`, data),
}
