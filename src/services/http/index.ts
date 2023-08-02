import axios from 'axios'
import qs from 'qs'
import i18n from 'i18next'

import { getToken, purgeToken } from '../../utils/token'
import env from '../../configs/env'

import { purgeUser } from '../../utils/user'
import { purgePermissions } from '../../utils/permission'
import toast from 'react-hot-toast'
import { MessageResultState } from 'src/types/general-types'

const { API_BASE_URL } = env

const languages: { [key: string]: string } = {
  tr: 'tr-TR',
  en: 'en-US'
}

const http = axios.create({
  baseURL: API_BASE_URL,
  timeout: 0,
  paramsSerializer: (params: any) => qs.stringify(params, { encode: false })
})

const { request, response } = http.interceptors

request.use(
  req => {
    const { headers } = req
    const commons = headers.common

    // if (!commons.hasOwnProperty('Content-Type')) headers.common['Content-Type'] = 'application/json'

    const token = getToken()
    if (token && !commons.hasOwnProperty('Authorization')) headers.common['Authorization'] = token

    const lang = i18n.language
    if (lang) headers.common['Accept-Language'] = languages[lang] || 'en-US'

    return req
  },
  err => Promise.reject(err)
)

response.use(
  res => {
    if (res?.data?.state == MessageResultState.ERROR && res?.data?.message) {
      toast.error(res?.data?.message)
    } else if (res?.data?.state == MessageResultState.SUCCESS && res?.data?.message) {
      toast.success(res?.data?.message)
    } else if (res?.data?.state == MessageResultState.WARNING && res?.data?.message) {
      toast(res?.data?.message, { icon: '⚠️' })
    }

    return res
  },
  err => {
    const { response: res } = err

    if (res?.status === 401) {
      purgeUser()
      purgeToken()
      purgePermissions()

      window.location.reload()
    }

    if (res?.status >= 400 && res?.data?.error?.code != 'smart') {
      //window.location.href = `/error?type=${res.status}`

      return Promise.reject(res.data?.message)
    }

    if (res?.data?.message) {
      toast.error(res.data.message)

      return Promise.reject(res.data?.message)
    }

    return Promise.reject(err)
  }
)

export default http
