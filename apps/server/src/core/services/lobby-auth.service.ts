import ServerManager from '@core/server-manager'
import AppError from 'src/errors/AppError'
import { sign } from 'jsonwebtoken'
import { config } from 'src/config/token'

type IRequest = {
  name: string
}

type IResponse = {
  token: string
}

class LobbyAuthService {
  public async execute({ name }: IRequest): Promise<IResponse> {
    // Connected and authenticated users
    const players = ServerManager.getUsers()

    const existsPlayerWithSameName = players.find(
      p => p.getUsername().toLocaleLowerCase() === name.toLocaleLowerCase()
    )

    if (existsPlayerWithSameName) {
      throw new AppError('Já existe um jogador com este nickname online.')
    }

    // Generate jwt token
    const token = sign({}, config.secret, {
      subject: name,
      expiresIn: config.expiresIn
    })

    return { token }
  }
}

export default new LobbyAuthService()
