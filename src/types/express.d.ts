declare namespace Express {
  interface Request {
    user?: {
      id: number
      role: 'user' | 'approver' | 'admin'
    }
  }
}
