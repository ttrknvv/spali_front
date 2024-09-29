export interface IUser {
  id: number
  fullName: string
  email: string
  personalImg?: string
  createdAt: string
  role: ROLES
}

enum ROLES {
  ROLE_USER = 'ROLE_USER',
  ROLE_ADMIN = 'ROLE_ADMIN',
}
