// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

// ** Types
import { AuthValuesType, LoginParams, ErrCallbackType, UserDataType, UserTypes } from './types'
import http from 'src/services/http'
import env from 'src/configs/env'
import { MessageResultState, ServiceResult } from 'src/types/general-types'
import { LoginResponseDto, LoginStateEnum } from 'src/pages/login/types'
import { googleLogout, useGoogleLogin } from '@react-oauth/google'
import toast from 'react-hot-toast'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  googleLogin: () => Promise.resolve(),
  googleLogOut: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  const { API_BASE_URL } = env

  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)
  const [googleLoginResponse, setGoogleLoginResponse] = useState<string | null>(null)

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
      if (storedToken) {
        setLoading(true)
        await axios
          .get(authConfig.meEndpoint, {
            headers: {
              Authorization: storedToken
            }
          })
          .then(async response => {
            setLoading(false)
            const _jsonUser = window.localStorage.getItem('userData') ?? ''
            const _user: UserDataType = JSON.parse(_jsonUser)
            setUser({ ..._user })
          })
          .catch(err => {
            localStorage.removeItem('userData')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('accessToken')
            setUser(null)
            setLoading(false)
            if (!router.pathname.includes('login')) {
              // toast.error(err.response.data.error.error) //Hata mesajını göstermek istersek burayı açacağız.
              router.replace('/login')
            }
          })
      } else {
        setLoading(false)
      }
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const googleLogin = useGoogleLogin({
    onSuccess: codeResponse => {
      setGoogleLoginResponse(codeResponse.access_token)
    },
    onError: error => {
      toast.error(`Google Login Operation Failed: ${error}`)
      setGoogleLoginResponse(null)
    }
  })

  const googleLogutActions = () => {
    googleLogout()
    setGoogleLoginResponse(null)
  }
  useEffect(() => {
    if (googleLoginResponse) {
      setLoading(true)

      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleLoginResponse}`, {
          headers: {
            Authorization: `Bearer ${googleLoginResponse}`,
            Accept: 'application/json'
          }
        })
        .then(async res => {
          if (res.data && res.data.email) {
            const googleUserData = {
              name: `${res.data.given_name} ${res.data.family_name}`,
              email: res.data.email,
              userType: UserTypes.GoogleUser
            }

            http.defaults.baseURL = API_BASE_URL
            const response: ServiceResult<LoginResponseDto> = await (
              await http.post(`/account/login-with-google`, googleUserData)
            ).data

            if (response.state === MessageResultState.SUCCESS) {
              setLoading(false)
              window.localStorage.setItem(
                authConfig.storageTokenKeyName,
                response.result.token.replace('Bearer', '').trim()
              )
              const returnUrl = router.query.returnUrl
              const _user = response.result.user
              _user.role = 'client'
              setUser({ ..._user })
              window.localStorage.setItem('userData', JSON.stringify(_user))
              const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
              router.replace(redirectURL as string)
              setLoading(false)
              setGoogleLoginResponse(null)
            } else {
              toast.error('An Error Occurred During The Login Process.')
              setLoading(false)
              googleLogutActions()
            }
          } else {
            toast.error('Google Email Address Can Not Verified!')
            setLoading(false)
            googleLogutActions()
          }
        })
        .catch(err => {
          toast.error(err.message)
          googleLogutActions()
        })
    }
  }, [googleLoginResponse])

  const handleLogin = async (params: LoginParams, errorCallback?: ErrCallbackType) => {
    http.defaults.baseURL = API_BASE_URL
    const response: ServiceResult<LoginResponseDto> = await (await http.post(`/account/login`, params)).data
    if (response.state === MessageResultState.SUCCESS) {
      params.rememberMe
        ? window.localStorage.setItem(
            authConfig.storageTokenKeyName,
            response.result.token.replace('Bearer', '').trim()
          )
        : null
      const returnUrl = router.query.returnUrl
      const _user = response.result.user
      _user.role = 'client'
      setUser({ ..._user })
      params.rememberMe ? window.localStorage.setItem('userData', JSON.stringify(_user)) : null

      const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

      router.replace(redirectURL as string)
    } else {
      if (response.result.state === LoginStateEnum.IsNotVerified) {
        router.replace('/verify-email-resend')
      }

      // if (errorCallback) errorCallback({ error: response.message })
    }
  }

  const handleLogout = () => {
    if (user?.userType === UserTypes.GoogleUser) {
      googleLogutActions()
    }

    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/login')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    googleLogin: googleLogin,
    googleLogOut: googleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
