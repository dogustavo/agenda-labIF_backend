import jwt from 'jsonwebtoken'

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
