import { AxiosInstance } from 'axios'
import env from '../../../src/configs/env'
import http from '../../../src/services/http'
import { ServiceResult } from '../../../src/types/general-types'
import { RegisterRequestDto } from './types'

const { API_BASE_URL } = env

class Store {
  static readonly id: string = 'RegisterStore'

  get api(): AxiosInstance {
    http.defaults.baseURL = API_BASE_URL

    return http
  }

  async register(params: RegisterRequestDto) {
    const response: ServiceResult<RegisterRequestDto> = await (await this.api.post(`/account/register`, params)).data

    return response
  }
}

export default Store
