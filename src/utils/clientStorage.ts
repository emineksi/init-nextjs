import Cookies from 'js-cookie'
import Crypto from 'crypto-js'
import env from '../../src/configs/env'

const { COOKIE_HASH } = env

const clientStorage = {
  setItem: (key: string, value: string): void => {
    value = Crypto.AES.encrypt(Crypto.enc.Utf8.parse(value), COOKIE_HASH).toString()

    try {
      localStorage.setItem(key, value)
    } catch (exception) {
      Cookies.set(key, value)
    }
  },

  getItem: (key: string): string | null => {
    let value

    try {
      value = localStorage.getItem(key)
    } catch (exception) {
      value = Cookies.get(key)
    }

    if (value) {
      value = Crypto.AES.decrypt(value, COOKIE_HASH).toString(Crypto.enc.Utf8)

      return value
    }

    return null
  },

  removeItem: (key: string): void => {
    try {
      return localStorage.removeItem(key)
    } catch (exception) {
      return Cookies.remove(key)
    }
  }
}

export default clientStorage
