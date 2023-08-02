interface IAuthenticationRequest {
  username: string
  password: string
  scope: string
  client_id: string
  client_secret: string
  grant_type: string
  rememberClient: boolean
}

export default IAuthenticationRequest
