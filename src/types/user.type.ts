import { UserRole } from './userRole.types'

export interface IUser {
  name: string
  email: string
  password: string
  role: 'user' | 'approver' | 'admin'
  userType: string
}
export interface IUserModel {
  name: string
  email: string
  password: string
  roleId: number
  userTypeId: number
}

export interface IUserType {
  description: string
  is_intern: boolean
}

export interface IUserTypeFind {
  query?: {
    name?: any
    page?: any
  }
}
