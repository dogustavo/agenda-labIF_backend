import jwt from 'jsonwebtoken'
import { throwError } from './error'

const JWT_SECRET = process.env.JWT_SECRET || ''

interface IToken {
  id: number
  role: string
}

export function generateToken({
  id,
  role
}: {
  id: number
  role: string
}) {
  return jwt.sign({ id, role }, JWT_SECRET, { expiresIn: '1h' })
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET)
}

export function getUserInfoFromToken(token?: string) {
  if (!token) {
    return throwError({
      message: 'Usuário não autorizado',
      statusCode: 401
    })
  }

  const decode = jwt.verify(token?.split(' ')[1], JWT_SECRET)

  if (typeof decode === 'string') {
    return throwError({
      message: 'Usuário não autorizado',
      statusCode: 401
    })
  }

  return {
    id: decode.id,
    role: decode.role
  } as IToken
}
