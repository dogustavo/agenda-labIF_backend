import { Request, Response } from 'express'

import { equipamentService } from '~/services/Equipament.services'

import { handleError } from '~/utils/error'

export const equipamentController = {
  create: async (_request: Request, response: Response) => {
    try {
      const equipament = _request.body

      const data = await equipamentService.create(equipament)

      return response.json(data)
    } catch (error) {
      return handleError(error, response)
    }
  },
  getAll: async (_request: Request, response: Response) => {
    try {
      const { name, page } = _request.query

      const equipaments = await equipamentService.getAll({
        query: {
          name,
          page
        }
      })

      return response.json(equipaments)
    } catch (error) {
      return handleError(error, response)
    }
  },
  getAvailabilty: async (
    _request: Request,
    response: Response
  ): Promise<Response> => {
    try {
      const { equipamentId } = _request.params
      const { selectedDay } = _request.query

      if (!selectedDay) {
        return response.status(400).json({ error: 'Dia inválido' })
      }

      const avaliability = await equipamentService.getAvailabilty({
        id: Number(equipamentId),
        selectedDay: String(selectedDay)
      })

      return response.json(avaliability)
    } catch (error) {
      return handleError(error, response)
    }
  }
}
