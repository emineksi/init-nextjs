import qs from 'qs'

import IAuthenticationRequest from './IAuthenticationRequest'
import IAuthenticationResult from './IAuthenticationResult'

import http from '../http'
import env from '../../configs/env'

const { API_BASE_URL } = env

const authenticate = (input: IAuthenticationRequest): Promise<IAuthenticationResult> => {
  http.defaults.baseURL = API_BASE_URL

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

  return new Promise((resolve: any, reject: any) => {
    http
      .post('connect/token', qs.stringify(input), config)
      .then((response: { data: IAuthenticationResult }) => response.data)
      .then((data: IAuthenticationResult) => resolve(data))
      .catch((error: any) => reject(error))
  })
}

// export { IAuthenticationRequest, IAuthenticationResult }

export default authenticate
