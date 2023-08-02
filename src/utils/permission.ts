import storage from './clientStorage'

const getPermissions = () => {
  const _p = storage.getItem('_p')
  const result = _p ? JSON.parse(_p) : null

  return result
}

const setPermissions = (permissions: string[]) => {
  storage.removeItem('_p')
  storage.setItem('_p', JSON.stringify(permissions))
}

const purgePermissions = () => storage.removeItem('_p')

export { getPermissions, setPermissions, purgePermissions }
