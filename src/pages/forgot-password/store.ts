import { AxiosInstance } from 'axios'
import env from '../../../src/configs/env'
import http from '../../../src/services/http'
import { ServiceResult } from '../../../src/types/general-types'
import { ForgotPasswordRequestDto } from './types'

const { API_BASE_URL } = env

class Store {
  static readonly id: string = 'ForgotPasswordStore'

  get api(): AxiosInstance {
    http.defaults.baseURL = API_BASE_URL

    return http
  }

  async forgotPassword(params: ForgotPasswordRequestDto) {
    const response: ServiceResult<ForgotPasswordRequestDto> = await (
      await this.api.post(`/account/forgot-password`, params)
    ).data

    return response
  }
}

export default Store
