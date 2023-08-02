import { UserDataType } from 'src/context/types'
import storage from './clientStorage'

// export interface Role {
//   id: number
//   name: string
// }

const getUser = (): UserDataType => {
  const _u = storage.getItem('_u')

  return _u ? JSON.parse(_u) : null
}

const setUser = (user: UserDataType) => {
  storage.removeItem('_u')
  storage.setItem('_u', JSON.stringify(user))
}

const purgeUser = () => storage.removeItem('_u')

export { getUser, setUser, purgeUser }
