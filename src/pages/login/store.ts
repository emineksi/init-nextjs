import { AxiosInstance } from 'axios'
import env from '../../../src/configs/env'
import http from '../../../src/services/http'
import { ServiceResult } from '../../../src/types/general-types'
import { LoginRequestDto, LoginResponseDto, AccountUserInfoDto } from './types'

const { API_BASE_URL } = env

class Store {
  static readonly id: string = 'LoginStore'

  get api(): AxiosInstance {
    http.defaults.baseURL = API_BASE_URL

    return http
  }

  async checkLogin(params: LoginRequestDto) {
    const response: ServiceResult<LoginResponseDto> = await (await this.api.post(`/account/login`, params)).data

    return response
  }

  async loginWithGoogle(params: AccountUserInfoDto) {
    const response: ServiceResult<LoginResponseDto> = await (
      await this.api.post(`/account/login-with-google`, params)
    ).data

    return response
  }
}

export default Store
