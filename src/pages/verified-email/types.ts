export interface VerifyEmailResponseDto {
  state: VerifyEmailResponseStateEnum
}

export enum VerifyEmailResponseStateEnum {
  Success = 0,
  Error = 1,
  Expired = 2
}
