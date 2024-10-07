// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '~/utils/jwt'

interface IToken {
  id: number
  role: 'user' | 'approver' | 'admin'
}

export interface AuthenticatedRequest extends Request {
  user?: IToken
}

export function authMiddleware(requiredRole: string[]) {
  return (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return res
        .status(401)
        .json({ message: 'Authorization header is missing' })
    }

    const token = authHeader.split(' ')[1]

    if (!token) {
      return res.status(401).json({ message: 'Token not found' })
    }

    try {
      const decoded = verifyToken(token) as IToken
      req.user = decoded

      if (!requiredRole.includes(req.user.role)) {
        return res
          .status(403)
          .json({ message: 'Forbidden: Insufficient role' })
      }

      req.user = decoded
      next()
    } catch (error) {
      return res
        .status(401)
        .json({ message: 'Invalid or expired token' })
    }
  }
}
