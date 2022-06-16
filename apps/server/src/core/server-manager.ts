/* eslint-disable @typescript-eslint/no-explicit-any */
import { Express } from 'express'
import { Event, Server, Socket } from 'socket.io'
import http from 'http'

import { User, UserStatus } from '@utils/dtos/User'
import { Events } from '@utils/events'

type Listener = {
  event: Events | Event
  handler: (socket: Socket, ...params: any) => void
}

class ServerManager {
  private users: User[] = []
  private readonly listeners: Listener[] = []
  private connection: Server | undefined

  public init(app: Express) {
    const server = http.createServer(app)

    this.connection = new Server(server, {
      cors: {
        origin: 'http://localhost:3000'
      }
    })

    this.registerListeners()

    server.listen(3333, () => {
      console.log('[Server] Listening on 3333')
    })
  }

  public registerListener(event: Events | Event, handler: Listener['handler']) {
    this.listeners.push({ event, handler })
  }

  public getConnection(): Server | undefined {
    return this.connection
  }

  private registerListeners() {
    this.connection?.on('connection', socket => {
      this.listeners.forEach(listener => {
        socket.on(listener.event as string, (...args) =>
          listener.handler(socket, ...args)
        )
      })

      socket.on('disconnect', () => {
        this.removeUserById(socket.id)
        console.log('[Debug]', socket.id, 'disconnected')
      })
    })
  }

  public removeUserById(id: string) {
    const user = this.users.find(usr => usr.id === id)

    if (!user) return

    this.users = this.users.filter(usr => usr.id !== id)

    console.log('[Debug]', user.nickname, 'left the lobby')
  }

  public removeUserByNickname(nickname: string) {
    const user = this.users.find(usr => usr.nickname === nickname)

    if (!user) return

    this.users = this.users.filter(usr => usr.nickname !== nickname)

    console.log('[Debug]', user.nickname, 'left the lobby')
  }

  public getUsers() {
    return this.users
  }

  public updateUserStatus(nickname: string, status: UserStatus) {
    const index = this.users.findIndex(usr => usr.nickname === nickname)
    const user = this.users.find(usr => usr.nickname === nickname)

    if (index === -1 || !user) return

    this.users[index] = {
      ...user,
      status
    }

    console.log('[Debug] Status of', user.nickname, 'changed to', status)
  }

  public addUser(user: User) {
    if (this.users.find(usr => usr.nickname === user.nickname)) {
      throw new Error('Já existe um jogador com esse nickname online')
    }

    console.log('[Debug]', user.nickname, 'joined in the lobby')
    this.users.push(user)
  }
}

export default new ServerManager()
