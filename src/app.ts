import express from 'express'
import cors from 'cors'
import helmet from 'helmet'

import { registerRoutes } from '~/router'

const app = express()

app.use(express.json())
app.use(
  cors({
    credentials: true
  })
)
app.use(helmet())

registerRoutes(app)

export { app }
