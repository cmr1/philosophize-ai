const fs = require('fs')
const path = require('path')

const APP_ENV = process.env.APP_ENV || 'development'

let envFilePath = path.resolve(process.cwd(), `.env.${APP_ENV}`)

if (fs.existsSync(envFilePath)) {
  require('dotenv').config({ path: envFilePath })
}
