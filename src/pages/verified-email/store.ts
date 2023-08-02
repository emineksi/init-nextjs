import { AxiosInstance } from 'axios'
import env from '../../../src/configs/env'
import http from '../../../src/services/http'
import { ServiceResult } from '../../../src/types/general-types'
import { VerifyEmailResponseDto } from './types'

const { API_BASE_URL } = env

class Store {
  static readonly id: string = 'VerifiedEmailStore'

  get api(): AxiosInstance {
    http.defaults.baseURL = API_BASE_URL

    return http
  }

  async verifyEmail(params: string) {
    const response: ServiceResult<VerifyEmailResponseDto> = await (
      await this.api.get('/account/verify-email?hashedKey=' + params)
    ).data

    return response
  }

  async directLogin(params: string) {
    const response: ServiceResult = await (await this.api.get('/account/direct-login?hashedKey=' + params)).data

    return response
  }
}

export default Store
