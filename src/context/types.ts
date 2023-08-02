export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  email: string
  password: string
  rememberMe?: boolean
}

export type UserDataType = {
  id: string
  role: string
  email: string
  fullName: string
  username: string
  password: string
  avatar?: string | null
  userType: UserTypes
}

export enum UserTypes {
  Admin = 1,
  User = 2,
  GoogleUser = 3
}

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: UserDataType | null
  setLoading: (value: boolean) => void
  setUser: (value: UserDataType | null) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
  googleLogin: () => void
  googleLogOut: () => void
}
