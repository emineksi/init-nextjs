export enum MessageResultState {
  ERROR = 0,
  SUCCESS = 1,
  WARNING = 2
}
export interface ServiceResult<T = any> {
  result: T
  isSuccess: boolean
  message: string
  state: MessageResultState
}
export interface DataTableItemsDto<T> {
  totalCount: number
  items: T[]
}
export interface Row<T> {
  row: {
    original: T
  }
}
export interface BranchBasicDto {
  branchId: number
  branchName: string
  regionId: number
}

export interface RegionBasicDto {
  regionId: number
  regionName: string
}
export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  request?: any
}
export type ComboBoxData = {
  id: number
  name: string
  parentId?: string | number | undefined
}
export type ComboBoxDataStr = {
  id: string
  name: string
  parentId?: string | number | undefined
}
export interface TokenResultDto {
  nameidentifier: string
  exp: number
  aud: string
  iss: string
  mail: string
  name: string
  nbf: string
  userId: string
  userType: string
}

// export interface PermissionDto {
//   id: number
//   roleId: number | null
//   grantedKey: string
//   name: string
//   userId: number | null
// }

export interface EnumPropDto {
  value: number
  name: string
  description: string
}
