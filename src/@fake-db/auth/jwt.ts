// ** JWT import
import jwt from 'jsonwebtoken'

// ** Mock Adapter
import mock from 'src/@fake-db/mock'

// ** Types
import { UserDataType, UserTypes } from 'src/context/types'

const users: UserDataType[] = []

// ! These two secrets should be in .env file and not in any other file
const jwtConfig = {
  secret: 'S1ren2010!_quizmvp2023',

  // secret: process.env.NEXT_PUBLIC_JWT_SECRET,
  expirationTime: 600

  //expirationTime: process.env.NEXT_PUBLIC_JWT_EXPIRATION

  // refreshTokenSecret: process.env.NEXT_PUBLIC_JWT_REFRESH_TOKEN_SECRET
}

type ResponseType = [number, { [key: string]: any }]

mock.onGet('/auth/me').reply(config => {
  console.log('mock.onGet calisti')
  let response: ResponseType = [200, {}]

  // @ts-ignore
  const token = config.headers.Authorization as string

  jwt.verify(token, jwtConfig.secret as string, { algorithms: ['HS256'] }, (err, decoded) => {
    // ** If token is expired
    if (err) {
      response = [401, { error: { error: err.message } }]
    } else {
      response = [200, {}]
    }
  })

  return response
})
