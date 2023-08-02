// ** React Imports
import { useState, ChangeEvent, ReactNode, useEffect } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import AuthIllustrationV1Wrapper from 'src/views/pages/auth/AuthIllustrationV1Wrapper'
import Store from './store'
import { toast } from 'react-hot-toast'
import { MessageResultState } from 'src/types/general-types'
import { Controller, useForm } from 'react-hook-form'
import { ResetPasswordRequestDto } from './types'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'

// ** Third Party Imports
import * as yup from 'yup'

interface State {
  newPassword: string
  showNewPassword: boolean
  confirmNewPassword: string
  showConfirmNewPassword: boolean
}

const schema = yup.object().shape({
  newPassword: yup.string().min(5).required(),
  confirmNewPassword: yup.string().min(5).required(),
  showNewPassword: yup.boolean(),
  showConfirmNewPassword: yup.boolean()
})

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '25rem' }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  justifyContent: 'center',
  color: `${theme.palette.primary.main} !important`
}))

const ResetPasswordV1 = () => {
  const [errorPage, setErrorPage] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [mail, setMail] = useState<string>('')

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<State>({ mode: 'onBlur' })

  // ** States
  const [values, setValues] = useState<State>({
    newPassword: '',
    showNewPassword: false,
    confirmNewPassword: '',
    showConfirmNewPassword: false
  })

  // ** Hook
  const theme = useTheme()
  const router = useRouter()

  // Handle New Password
  const handleNewPasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword })
  }

  // Handle Confirm New Password
  const handleConfirmNewPasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleClickShowConfirmNewPassword = () => {
    setValues({ ...values, showConfirmNewPassword: !values.showConfirmNewPassword })
  }
  useEffect(() => {
    const query = new URLSearchParams(window.location.search)
    const hashedKey = query.get('u')
    const store = new Store()
    if (hashedKey) {
      store
        .receiveMailFromEncryptedKey(hashedKey)
        .then(response => {
          if (response?.state === MessageResultState.SUCCESS) {
            setErrorPage(false)
            setMail(response.result.email)
          } else {
            setErrorPage(true)
            setErrorMessage(response.message)
          }
        })
        .catch(() => {
          setErrorPage(true)
          toast.error('Looks like the activation link you followed is broken or invalid.')
        })
    } else {
      setErrorPage(true)
      setErrorMessage('Looks like the activation link you followed is broken or invalid.')
      toast.error('Looks like the activation link you followed is broken or invalid.')
    }
  }, [])

  const onSubmit = (data: State) => {
    const query = new URLSearchParams(window.location.search)
    const hashedKey = query.get('u')
    if (hashedKey) {
      const { newPassword } = data
      const store = new Store()
      store.resetPassword({ hashedKey: hashedKey, password: newPassword }).then(response => {
        if (response?.state === MessageResultState.SUCCESS) {
          router.replace('login')
        } else {
          toast.error(response.message)
          setErrorPage(true)
          setErrorMessage(response.message)
        }
      })
    } else {
      toast.error('Looks like the activation link you followed is broken or invalid.')
    }
  }

  return !errorPage ? (
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
              <Typography variant='h4' sx={{ mb: 1.5 }}>
                Reset Password 🔒
              </Typography>
              <Typography sx={{ display: 'flex' }}>
                for{' '}
                <Typography component='span' sx={{ ml: 1, fontWeight: 500 }}>
                  {mail}
                </Typography>
              </Typography>
            </Box>
            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name='newPassword'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    sx={{ mb: 1.5 }}
                    fullWidth
                    value={value}
                    onBlur={onBlur}
                    label='Password'
                    onChange={onChange}
                    placeholder='············'
                    id='auth-reset-password-new-password'
                    error={Boolean(errors.newPassword)}
                    {...(errors.newPassword && { helperText: errors.newPassword.message })}
                    type={values.showNewPassword ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onMouseDown={e => e.preventDefault()}
                            onClick={handleClickShowNewPassword}
                          >
                            <Icon fontSize='1.25rem' icon={values.showNewPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
              />
              {/* <CustomTextField
                fullWidth
                autoFocus
                label='New Password'
                placeholder='············'
                value={values.newPassword}
                sx={{ display: 'flex', mb: 4 }}
                id='auth-reset-password-new-password'
                onChange={handleNewPasswordChange('newPassword')}
                type={values.showNewPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={handleClickShowNewPassword}
                        onMouseDown={e => e.preventDefault()}
                        aria-label='toggle password visibility'
                      >
                        <Icon fontSize='1.25rem' icon={values.showNewPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              /> */}
              <Controller
                name='confirmNewPassword'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    sx={{ mb: 1.5 }}
                    fullWidth
                    placeholder='············'
                    value={value}
                    onBlur={onBlur}
                    label='Confirm Password'
                    onChange={onChange}
                    id='auth-reset-password-confirm-password'
                    error={Boolean(errors.confirmNewPassword)}
                    {...(errors.confirmNewPassword && { helperText: errors.confirmNewPassword.message })}
                    type={values.confirmNewPassword ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onMouseDown={e => e.preventDefault()}
                            onClick={handleClickShowConfirmNewPassword}
                          >
                            <Icon
                              fontSize='1.25rem'
                              icon={values.showConfirmNewPassword ? 'tabler:eye' : 'tabler:eye-off'}
                            />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
              />
              {/* <CustomTextField
                fullWidth
                label='Confirm Password'
                placeholder='············'
                sx={{ display: 'flex', mb: 4 }}
                value={values.confirmNewPassword}
                id='auth-reset-password-confirm-password'
                type={values.showConfirmNewPassword ? 'text' : 'password'}
                onChange={handleConfirmNewPasswordChange('confirmNewPassword')}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onMouseDown={e => e.preventDefault()}
                        aria-label='toggle password visibility'
                        onClick={handleClickShowConfirmNewPassword}
                      >
                        <Icon
                          fontSize='1.25rem'
                          icon={values.showConfirmNewPassword ? 'tabler:eye' : 'tabler:eye-off'}
                        />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              /> */}
              <Button fullWidth type='submit' variant='contained' sx={{ mb: 4 }}>
                Set New Password
              </Button>
              <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', '& svg': { mr: 1 } }}>
                <Typography component={LinkStyled} href='/login'>
                  <Icon fontSize='1.25rem' icon='tabler:chevron-left' />
                  <span>Back to login</span>
                </Typography>
              </Typography>
            </form>
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
                Your password could not be reset:
              </Typography>
              <Typography variant='h4' sx={{ mb: 5, textAlign: 'center' }}>
                {errorMessage}
              </Typography>
              <Typography variant='h4' sx={{ mb: 1.5, textAlign: 'center' }}>
                <Icon icon='tabler:alert-triangle' fontSize='3rem' color='#7367F0' />
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </AuthIllustrationV1Wrapper>
    </Box>
  )
}

ResetPasswordV1.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

ResetPasswordV1.guestGuard = true
ResetPasswordV1.authGuard = false

export default ResetPasswordV1
