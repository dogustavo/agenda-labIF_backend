import { Response } from 'express'

interface CustomError {
  message: string
  statusCode: number
}

export const throwError = ({ message, statusCode }: CustomError) => {
  const error = new Error(message)
  ;(error as any).statusCode = statusCode
  throw error
}

export const handleError = (err: any, response: Response) => {
  const { statusCode = 500, message } = err

  if (err instanceof Error) {
    return response.status(statusCode).json({
      success: false,
      error: message
    })
  }

  return response.status(500).json({ error: 'Unexpected error' })
}
