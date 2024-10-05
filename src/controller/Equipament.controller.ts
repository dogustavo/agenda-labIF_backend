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
  }
}
