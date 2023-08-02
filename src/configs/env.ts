import getConfig from 'next/config'
import dotenv from 'dotenv'

// const { publicRuntimeConfig } = getConfig()

dotenv.config()
dotenv.config({ path: '.env.production' })

// const Environments = {
//   API_BASE_URL: publicRuntimeConfig.API_BASE_URL,
//   COOKIE_HASH: publicRuntimeConfig.COOKIE_HASH,
//   GOOGLE_OAUTH_CLIENT_ID: publicRuntimeConfig.GOOGLE_OAUTH_CLIENT_ID
// }
let Environments = {
  API_BASE_URL: 'https://localhost:44321',
  COOKIE_HASH: '0^jw/Q~v2%;:owg(17^FZ>j0<M1:n<FlOPjvnEx]TAYTPr%)_}kU%Ff#RHcTvTX',
  GOOGLE_OAUTH_CLIENT_ID: '1079188059327-e2s4kljhi84knsq0o7htq8ut5jot0l6l.apps.googleusercontent.com'
}

if (process.env.NODE_ENV === 'production') {
  Environments = {
    API_BASE_URL: 'https://trainiq-api.azurewebsites.net',
    COOKIE_HASH: '0^jw/Q~v2%;:owg(17^FZ>j0<M1:n<FlOPjvnEx]TAYTPr%)_}kU%Ff#RHcTvTX',
    GOOGLE_OAUTH_CLIENT_ID: '1079188059327-e2s4kljhi84knsq0o7htq8ut5jot0l6l.apps.googleusercontent.com'
  }
}

export default Environments
