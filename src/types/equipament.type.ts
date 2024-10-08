export interface IEquipament {
  equipamentName: string
  availableFrom: string
  availableTo: string
}

export interface IEquipamentFind {
  query?: {
    name?: any
    page?: any
  }
}
