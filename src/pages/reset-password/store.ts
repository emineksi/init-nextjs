import { AxiosInstance } from 'axios'
import env from '../../../src/configs/env'
import http from '../../../src/services/http'
import { ServiceResult } from '../../../src/types/general-types'
import { ReceiveMailFromEncryptedKeyResponseDto, ResetPasswordRequestDto } from './types'

const { API_BASE_URL } = env

class Store {
  static readonly id: string = 'ResetPasswordStore'

  get api(): AxiosInstance {
    http.defaults.baseURL = API_BASE_URL

    return http
  }

  async receiveMailFromEncryptedKey(params: string) {
    const response: ServiceResult<ReceiveMailFromEncryptedKeyResponseDto> = await (
      await this.api.get('/account/receive-mail-encrypted-key?hashedKey=' + params)
    ).data

    return response
  }

  async resetPassword(params: ResetPasswordRequestDto) {
    const response: ServiceResult = await (await this.api.post('/account/reset-password', params)).data

    return response
  }
}

export default Store
