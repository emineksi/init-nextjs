import Crypto from 'crypto-js'

import storage from './clientStorage'
import env from '../../src/configs/env'

const { COOKIE_HASH } = env

const header = {
  alg: 'SHA256',
  typ: 'JWT'
}

const base64url = (source: any) => {
  // Encode in classical base64
  let encodedSource = Crypto.enc.Base64.stringify(source)

  // Remove padding equal characters
  encodedSource = encodedSource.replace(/=+$/, '')

  // Replace characters according to base64url specifications
  encodedSource = encodedSource.replace(/\+/g, '-')
  encodedSource = encodedSource.replace(/\//g, '_')

  return encodedSource
}

const getToken = () => storage.getItem('_t')

const setToken = (token: string) => {
  storage.removeItem('_t')
  storage.setItem('_t', token)
}

const purgeToken = () => storage.removeItem('_t')

export { getToken, setToken, purgeToken }
