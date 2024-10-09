export interface IUser {
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
