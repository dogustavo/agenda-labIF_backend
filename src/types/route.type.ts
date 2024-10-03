import { Request, Response } from 'express'

type HttpMethod =
  | 'get'
  | 'post'
  | 'put'
  | 'delete'
  | 'patch'
  | 'options'
  | 'head'

export interface Route {
  method: HttpMethod
  path: string
  handler: (req: Request, res: Response) => Promise<Response>
  description: string
  middlewares?: any[]
}
