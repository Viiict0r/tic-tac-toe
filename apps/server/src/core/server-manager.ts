/* eslint-disable @typescript-eslint/no-explicit-any */
import { Express } from 'express'
import { Event, Server, Socket } from 'socket.io'
import http from 'http'

import gameMatchJob from 'src/jobs/game-match.job'
import { Player } from '@utils/models/Player'
import { PlayerStatus, Events } from 'dtos'

type Listener = {
  event: Events | Event
  handler: (socket: Socket, ...params: any) => void
}

class ServerManager {
  private users: Player[] = []
  private readonly listeners: Listener[] = []
  private connection: Server | undefined

  public init(app: Express) {
    const server = http.createServer(app)

    let origins = []
    const env = process.env.APP_URL || 'http://localhost:*'

    if (env.indexOf(';') !== -1) {
      origins = env.split(';')
    } else {
      origins.push(env)
    }

    this.connection = new Server(server, {
      cors: {
        origin: origins
      }
    })

    this.registerListeners()
    this.runjobs()

    const port = process.env.PORT || 3333

    server.listen(port, () => {
      console.log(`[Server] Listening on ${port}`)
    })
  }

  public registerListener(event: Events | Event, handler: Listener['handler']) {
    this.listeners.push({ event, handler })
  }

  public getConnection(): Server | undefined {
    return this.connection
  }

  private runjobs() {
    gameMatchJob.execute()
  }

  private registerListeners() {
    this.connection?.on('connection', socket => {
      console.log('[Debug] #', socket.id, 'connected')

      this.listeners.forEach(listener => {
        socket.on(listener.event as string, (...args) =>
          listener.handler(socket, ...args)
        )
      })
    })
  }

  public removeUserById(id: string) {
    const user = this.users.find(usr => usr.getUserId() === id)

    if (!user) return

    this.users = this.users.filter(usr => usr.getUserId() !== id)

    console.log('[Debug]', user.getUsername(), 'left the lobby')
  }

  public removeUserByNickname(nickname: string) {
    const user = this.users.find(usr => usr.getUsername() === nickname)

    if (!user) return

    this.users = this.users.filter(usr => usr.getUsername() !== nickname)

    console.log('[Debug]', user.getUsername(), 'left the lobby')
  }

  public getUsers() {
    return this.users
  }

  public getPlayerById(socketId: string) {
    return this.users.find(usr => usr.getUserId() === socketId)
  }

  public updateUserStatus(nickname: string, status: PlayerStatus) {
    const index = this.users.findIndex(usr => usr.getUsername() === nickname)
    const user = this.users.find(usr => usr.getUsername() === nickname)

    if (index === -1 || !user) return

    user.setStatus(status)

    this.users[index] = user

    console.log('[Debug] Status of', user.getUsername(), 'changed to', status)
  }

  public addUser(user: Player) {
    if (this.users.find(usr => usr.getUsername() === user.getUsername())) {
      throw new Error('Já existe um jogador com esse nickname online')
    }

    this.users.push(user)

    console.log('[Debug]', user.getUsername(), 'joined in the lobby')
  }
}

export default new ServerManager()
