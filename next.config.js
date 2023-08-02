/** @type {import('next').NextConfig} */

/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

// require('dotenv').config()

// const dotenv = require('dotenv')

// // console.log(process.env.NODE_ENV)
// if (process.env.NODE_ENV === 'production') {
//   dotenv.config({ path: '.env.production' })
// } else {
//   dotenv.config({ path: '.env.local' })
// }

// Remove this if you're not using Fullcalendar features

module.exports = {
  pageExtensions: ['tsx'],

  trailingSlash: true,
  reactStrictMode: false,

  // env: {
  //   API_BASE_URL: process.env.REACT_APP_API_BASE_URL,
  //   COOKIE_HASH: process.env.REACT_APP_COOKIE_HASH,
  //   GOOGLE_OAUTH_CLIENT_ID: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID
  // },

  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }

    return config
  }
}
