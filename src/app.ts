import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'

import { registerRoutes } from '~/router'

const app = express()

dotenv.config({
  path: '.env'
})

app.use(express.json())
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000'
  })
)
app.use(helmet())
registerRoutes(app)

export { app }
