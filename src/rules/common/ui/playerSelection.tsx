import styled from 'styled-components'
import { useState } from 'react'
import { getGame } from '../../../GameContext'
import { ColorPicker } from './components/colorPicker'
import { ModalWrapper } from './components/styled'
import { Player } from '../types'

export const name = 'playerSelection'

const ControlForm = styled.form`
    padding: 20px;
`

const ControlSet = styled.div`
    padding-bottom: 5px;   
`

export type PlayerSelectionPayload = {
    player1: Player,
    player2: Player
}

const PlayerSelectionModal = (props: { onSubmit: (payload: PlayerSelectionPayload) => void }) => {
    const [player1Name, setPlayer1Name] = useState('Player 1')
    const [player2Name, setPlayer2Name] = useState('Player 2')
    const [player1Color, setPlayer1Color] = useState('#004DCF')
    const [player2Color, setPlayer2Color] = useState('#DB3E00')
    
    const clickSubmit = () => {
        if (player1Name) {
            if( player2Name ) {
                props.onSubmit({
                    player1: {
                        name: player1Name,
                        color: player1Color,
                        goesFirst: null,
                    },
                    player2: {
                        name: player2Name,
                        color: player2Color,
                        goesFirst: null,
                    }
                })
            }
        }
    }
    return (
        <ModalWrapper>
            <ControlForm>
                <ControlSet>
                    <label>Player 1 Name: </label>
                    <input value={player1Name} onChange={e => setPlayer1Name(e.target.value)} required />
                    <ColorPicker onSubmit={setPlayer1Color} value={player1Color} />
                </ControlSet>
                <ControlSet>
                    <label>Player 2 Name: </label>
                    <input value={player2Name} onChange={e => setPlayer2Name(e.target.value)} required />
                    <ColorPicker onSubmit={setPlayer2Color} value={player2Color} />
                </ControlSet>
                <button onClick={clickSubmit} type="submit">Submit</button>
            </ControlForm>
        </ModalWrapper>
    )
}

export const getPlayers = async () => {
    return new Promise<PlayerSelectionPayload>((resolve, reject) => {
        const g = getGame()
        const onSuccess = (payload: PlayerSelectionPayload) => {
            g.removeUI(name)
            g.refresh()
            resolve(payload)
        }
        g.addUI(name, (
            <PlayerSelectionModal onSubmit={onSuccess} />
        ))
        g.refresh()
    })
}