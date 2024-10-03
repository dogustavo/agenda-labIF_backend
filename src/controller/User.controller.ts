import {
  Request as ExpressRequest,
  Response as ExpressResponse
} from 'express'

export const getUsers = async (
  _request: ExpressRequest,
  response: ExpressResponse
) => {
  try {
    return response.status(200).json({
      ok: 'ok'
    })
  } catch (err) {
    return response.sendStatus(400)
  }
}
