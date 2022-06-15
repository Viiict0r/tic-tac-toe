import React, { useState } from 'react'
import { Input } from '@components/Input'
import { Button } from '@components/Button'

import { useProfile } from '@hooks/useProfile'
import { useGame } from '@hooks/useGame'
import { Events } from '@utils/events'

import styles from '@styles/Index/Index.module.scss'

export default function Index() {
  const [nickField, setNickField] = useState('')

  const { connection } = useGame()
  const { user } = useProfile()

  const handleContinue = () => {
    connection?.emit(
      Events.JOIN_LOBBY,
      { nickname: 'Viiict0r' },
      (error: string) => {
        if (error) {
          alert(error)
        }
      }
    )
  }

  const handleInputChange = (event: any) => {
    setNickField(event.target.value)
  }

  return (
    <div className="container">
      <div className={styles.wrapper}>
        <h1>Tic Tac Toe</h1>
        <div className={styles.input__wrapper}>
          <span>Para continuar, informe um nickname:</span>
          <Input
            placeholder="Ex.: Viiict0r"
            onChange={handleInputChange}
            value={nickField}
          />
          <Button onClick={handleContinue}>Continuar</Button>
        </div>
      </div>
    </div>
  )
}
