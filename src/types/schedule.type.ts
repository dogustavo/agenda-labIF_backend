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
