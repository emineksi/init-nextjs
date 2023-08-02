export interface ReceiveMailFromEncryptedKeyResponseDto {
  email: string
}

export interface ResetPasswordRequestDto {
  hashedKey: string
  password: string
}
