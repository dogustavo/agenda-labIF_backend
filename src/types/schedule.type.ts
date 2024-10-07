export interface ISchedules {
  scheduledBy: number
  scheduleDate: Date
  timeInit: string
  timeEnd: string
  equipamentId: number
}

export interface ISchedulesRequest {
  scheduleDate: Date
  timeInit: string
  timeEnd: string
  equipamentId: number
}

export interface IScheduleEvaluate {
  scheduleId: number
  action: 'approved' | 'repproved'
  aproverId: number
  role?: 'user' | 'approver' | 'admin'
}

export interface IScheduleFind {
  query?: {
    name?: any
    status?: any
    startDate?: any
    endDate?: any
    page?: any
  }
  user: {
    id: number
    role: string
  }
}
