import axios, { AxiosResponse } from 'axios'
import { urlAPI } from './api'
import { AuthResponse } from 'models/AuthRepsonse'
export const $api = axios.create({
  withCredentials: true,
  baseURL: urlAPI,
})
export default class AuthService {
  static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('auth/login', { email, password })
  }

  static async register(email: string, password: string, fullName: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('auth/register', { email, password, fullName })
  }

  static async logout(): Promise<AxiosResponse> {
    return $api.put<AuthResponse>('auth/logout')
  }

  static async checkAuth(): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('auth/refresh', { withCredentials: true })
  }

  static async authGoogle(): Promise<AxiosResponse> {
    return $api.get('auth/google')
  }
}
