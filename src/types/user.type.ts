export interface IUser {
  name: string
  email: string
  password: string
  role: 'user' | 'approver' | 'admin'
  userType: string
}

export interface IEditUser {
  name: string
  email: string
  role: 'user' | 'approver' | 'admin'
  userType: string
}

export interface IEditUserModel {
  name: string
  email: string
  roleId: number
  userTypeId: number
}
export interface IUserModel extends IEditUserModel {
  password: string
}

export interface IUserType {
  description: string
  is_intern: boolean
}

export interface IUserTypeFind {
  query?: {
    name?: any
    email?: any
    page?: any
  }
}
