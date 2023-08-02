// ** React Imports
import { ReactNode, useEffect, useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'

import { toast } from 'react-hot-toast'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

import authConfig from 'src/configs/auth'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import AuthIllustrationV1Wrapper from 'src/views/pages/auth/AuthIllustrationV1Wrapper'
import Store from './store'
import { MessageResultState } from 'src/types/general-types'
import { useAuth } from 'src/hooks/useAuth'
import { useRouter } from 'next/router'
import VerifyEmailResend from '../verify-email-resend'
import { VerifyEmailResponseStateEnum } from './types'

console.log('ee')

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '25rem' }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: `${theme.palette.primary.main} !important`
}))

const VerifiedEmail = () => {
  console.log('ee')

  const theme = useTheme()
  const auth = useAuth()
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [errorType, setErrorType] = useState<VerifyEmailResponseStateEnum>()

  useEffect(() => {
    const query = new URLSearchParams(window.location.search)
    const hashedKey = query.get('u')
    if (hashedKey) {
      // auth.setLoading(true)
      setLoading(true)

      new Store()
        .verifyEmail(hashedKey)
        .then(res => {
          if (res.state === MessageResultState.SUCCESS) {
            // auth.setLoading(false)
            setLoading(false)

            new Store().directLogin(hashedKey).then(response => {
              if (res.state === MessageResultState.SUCCESS) {
                window.localStorage.setItem(
                  authConfig.storageTokenKeyName,
                  response.result.token.replace('Bearer', '').trim()
                )
                const returnUrl = router.query.returnUrl
                const _user = response.result.user
                _user.role = 'client'
                auth.setUser({ ..._user })
                window.localStorage.setItem('userData', JSON.stringify(_user))
                console.log('ee')
                const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
                router.replace(redirectURL as string)
              }
            })
          } else {
            setLoading(false)
            setErrorType(res.result.state)
            setErrorMessage(res.message)
          }
        })
        .catch(err => {
          setLoading(false)
          setErrorType(VerifyEmailResponseStateEnum.Error)
          setErrorMessage('Looks like the activation link you followed is broken or invalid.')
        })
    } else {
      setLoading(false)
      setErrorType(VerifyEmailResponseStateEnum.Error)
      setErrorMessage('Looks like the activation link you followed is broken or invalid.')
    }
  }, [])

  return loading ? (
    <></>
  ) : !errorMessage ? (
    <Box className='content-center'>
      <AuthIllustrationV1Wrapper>
        <Card>
          <CardContent sx={{ p: theme => `${theme.spacing(10.5, 8, 8)} !important` }}>
            <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width={34} viewBox='0 0 32 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  fill={theme.palette.primary.main}
                  d='M0.00172773 0V6.85398C0.00172773 6.85398 -0.133178 9.01207 1.98092 10.8388L13.6912 21.9964L19.7809 21.9181L18.8042 9.88248L16.4951 7.17289L9.23799 0H0.00172773Z'
                />
                <path
                  fill='#161616'
                  opacity={0.06}
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M7.69824 16.4364L12.5199 3.23696L16.5541 7.25596L7.69824 16.4364Z'
                />
                <path
                  fill='#161616'
                  opacity={0.06}
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M8.07751 15.9175L13.9419 4.63989L16.5849 7.28475L8.07751 15.9175Z'
                />
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  fill={theme.palette.primary.main}
                  d='M7.77295 16.3566L23.6563 0H32V6.88383C32 6.88383 31.8262 9.17836 30.6591 10.4057L19.7824 22H13.6938L7.77295 16.3566Z'
                />
              </svg>
              <Typography variant='h3' sx={{ ml: 2.5, fontWeight: 700 }}>
                {themeConfig.templateName}
              </Typography>
            </Box>
            <Box sx={{ mb: 6 }}>
              <Typography variant='h4' sx={{ mb: 1.5, textAlign: 'center' }}>
                Your e-mail has been verified.
              </Typography>
              <Typography variant='h4' sx={{ mb: 1.5, textAlign: 'center' }}>
                ✉️
              </Typography>
              <Typography sx={{ color: 'text.secondary', textAlign: 'center' }}>
                You will be logged in in a few seconds..
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </AuthIllustrationV1Wrapper>
    </Box>
  ) : (
    <Box className='content-center'>
      <AuthIllustrationV1Wrapper>
        <Card>
          <CardContent sx={{ p: theme => `${theme.spacing(10.5, 8, 8)} !important` }}>
            <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width={34} viewBox='0 0 32 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  fill={theme.palette.primary.main}
                  d='M0.00172773 0V6.85398C0.00172773 6.85398 -0.133178 9.01207 1.98092 10.8388L13.6912 21.9964L19.7809 21.9181L18.8042 9.88248L16.4951 7.17289L9.23799 0H0.00172773Z'
                />
                <path
                  fill='#161616'
                  opacity={0.06}
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M7.69824 16.4364L12.5199 3.23696L16.5541 7.25596L7.69824 16.4364Z'
                />
                <path
                  fill='#161616'
                  opacity={0.06}
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M8.07751 15.9175L13.9419 4.63989L16.5849 7.28475L8.07751 15.9175Z'
                />
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  fill={theme.palette.primary.main}
                  d='M7.77295 16.3566L23.6563 0H32V6.88383C32 6.88383 31.8262 9.17836 30.6591 10.4057L19.7824 22H13.6938L7.77295 16.3566Z'
                />
              </svg>
              <Typography variant='h3' sx={{ ml: 2.5, fontWeight: 700 }}>
                {themeConfig.templateName}
              </Typography>
            </Box>
            <Box sx={{ mb: 6 }}>
              <Typography variant='h4' sx={{ mb: 5, textAlign: 'center' }}>
                Failed to activate your account: {errorMessage}
              </Typography>
              <Typography variant='h4' sx={{ mb: 1.5, textAlign: 'center' }}>
                <Icon icon='tabler:alert-triangle' fontSize='3rem' color='#7367F0' />
              </Typography>
              {errorType === VerifyEmailResponseStateEnum.Expired && (
                <>
                  <Typography sx={{ color: 'text.secondary', textAlign: 'center' }}>
                    Looks like the activation link you followed is broken or invalid. Try to get a new link or
                  </Typography>
                  <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography component={LinkStyled} href='/' onClick={e => e.preventDefault()} sx={{ ml: 1 }}>
                      Resend Activation Mail
                    </Typography>
                  </Box>
                </>
              )}
            </Box>
          </CardContent>
        </Card>
      </AuthIllustrationV1Wrapper>
    </Box>
  )
}

VerifiedEmail.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

VerifiedEmail.guestGuard = true
VerifiedEmail.authGuard = false

export default VerifiedEmail
