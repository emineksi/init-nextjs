interface IAuthenticationResult {
  access_token: string
  encryptedAccessToken: string
  expires_in: number
  userId: number
}

export default IAuthenticationResult
