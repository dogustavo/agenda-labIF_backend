import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'

import { registerRoutes } from '~/router/index.js'
import createAdminUser from '~/seeds/createAdmin.js'

const app = express()

dotenv.config({
  path: '.env'
})
;(async () => {
  await createAdminUser()
})()

app.use(express.json())
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization']
  })
)
app.use(helmet())
registerRoutes(app)

export default app
