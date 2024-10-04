// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '~/utils/jwt'

export interface AuthenticatedRequest extends Request {
  user?: { id: number; role: string } // Interface estendida para incluir o usuário
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

    const token = authHeader.split(' ')[1] // A estrutura é 'Bearer TOKEN'

    if (!token) {
      return res.status(401).json({ message: 'Token not found' })
    }

    try {
      const decoded = verifyToken(token)
      req.user = decoded as { id: number; role: string }

      if (!requiredRole.includes(req.user.role)) {
        return res
          .status(403)
          .json({ message: 'Forbidden: Insufficient role' })
      }

      next()
    } catch (error) {
      return res
        .status(401)
        .json({ message: 'Invalid or expired token' })
    }
  }
}
