import { Game } from '../../../engine/game'
import styled from 'styled-components'
import { useState } from 'react'
import { getGame } from '../../../GameContext'
import { GithubPicker } from 'react-color'

export const name = 'playerSelection'

const ModalWrapper = styled.div`
    position: fixed;
    top: 50px;
    bottom: 50px;
    left: 50px;
    right: 50px;
    background-color: white;
    border: 1px solid black;
`

const ControlForm = styled.form`
    padding: 20px;
`

const ControlSet = styled.form`
    padding-bottom: 5px;   
`

const Swatch = styled.div`
    width: 18px;
    height: 18px;
    border: 1px solid black;
    border-radius: 25%;
    margin-left: 5px;
    background-color: ${props => props.color};
    display: inline-block;
    margin-bottom: -4px;
`

type Player = {
    name: string
}

export type PlayerSelectionPayload = {
    player1: Player,
    player2: Player
}

const PlayerSelectionModal = (props: {onSubmit: (payload: PlayerSelectionPayload) => void}) => {
    const [player1Name, setPlayer1Name] = useState('Player 1')
    const [player2Name, setPlayer2Name] = useState('Player 2')
    
    const clickSubmit = () => {
        if (player1Name) {
            if( player2Name ) {
                props.onSubmit({
                    player1: {
                        name: player1Name
                    },
                    player2: {
                        name: player2Name
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
                    <Swatch color='#004DCF' />
                </ControlSet>
                <ControlSet>
                    <label>Player 2 Name: </label>
                    <input value={player2Name} onChange={e => setPlayer2Name(e.target.value)} required />
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