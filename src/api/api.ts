import axios, { AxiosResponse } from 'axios'
import i18next from 'i18next'
import { Store } from 'redux'
import { handleLogout, setPermissions } from 'reduxApp/authefication'
import { api } from './apiSpali'
import createPermissionsMap from 'utils/create-permissions-map'

let store: Store
export const urlAPI = `/api/`
let refreshPromise: Promise<AxiosResponse<any>> | undefined

export const $api = axios.create({
  withCredentials: true,
  baseURL: urlAPI,
})

$api.interceptors.request.use((config) => {
  if (localStorage.getItem('token') !== null) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  }
  config.headers['Accept-Language'] = i18next.language
  return config
})

$api.interceptors.response.use(
  (response) => {
    if (response.config.url === 'auth/permissions') {
      return { ...response, data: createPermissionsMap(response.data) }
    }
    return response
  },
  async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true
      try {
        const promise = refreshPromise ? refreshPromise : axios.get(`${urlAPI}auth/refresh`, { withCredentials: true })
        refreshPromise = promise
        const response = await promise
        refreshPromise = undefined
        localStorage.setItem('token', response.data.accessToken)

        const { data: permissions } = await api.getPermissions(response.data.accessToken)
        store.dispatch(setPermissions(permissions))
        return $api.request(originalRequest)
      } catch (e) {
        localStorage.removeItem('token')
        if (axios.isAxiosError(e) && e.response?.status === 400) {
          store.dispatch(handleLogout())
        }
        window.location.reload()
      }
    }
    throw error
  },
)
