import { AxiosInstance } from 'axios'
import env from '../../../src/configs/env'
import http from '../../../src/services/http'
import { ServiceResult } from '../../../src/types/general-types'
import { ResendActivationMailRequestDto } from './types'

const { API_BASE_URL } = env

class Store {
  static readonly id: string = 'ResendEmailStore'

  get api(): AxiosInstance {
    http.defaults.baseURL = API_BASE_URL

    return http
  }

  async EmailResend(params: ResendActivationMailRequestDto) {
    const response: ServiceResult = await (await this.api.post(`/account/resend-activation-mail`, params)).data

    return response
  }
}

export default Store
