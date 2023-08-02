interface IConfigResult {
  auth?: {}
  currentUser?: {
    isAuthenticated: boolean
  }
  localization: {}
  setting: {}
  [propName: string]: any
}

export default IConfigResult
