import { Request, Response } from 'express'

class GameValidationService {
  public async execute(request: Request, response: Response) {
    // ...

    return response.json('ok')
  }
}

export default new GameValidationService()
