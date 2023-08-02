// export interface User {
//   id: number
//   username: string
//   name: string
//   email: string
//   avatar: string
//   job_name: string
//   job_started_at: string | null
//   personnelId: string
//   isAdminBranch: boolean
// }

import { UserDataType, UserTypes } from 'src/context/types'

export interface LoginRequestDto {
  email: string
  password: string
}

export interface LoginResponseDto {
  user: UserDataType
  token: string
  state: LoginStateEnum
}

export enum LoginStateEnum {
  Success = 0,
  Error = 1,
  IsNotVerified = 2
}

export interface AccountUserInfoDto {
  id: string
  name: string
  email: string
  userType: UserTypes
}
