import styled from 'styled-components'
import { useState } from 'react'
import { getGame } from '../../../GameContext'
import { ModalWrapper } from './components/styled'
import { Player } from '../types'
import { sleep, standardRoll } from '../scripts'

export const name = 'playerSelection'

export type PlayerSelectionPayload = {
    player1: Player,
    player2: Player
}

const PlayerLargeText = styled.span`
    font-size: 24px;
    color: ${props => props.color};
`

const PlayerWrapper = styled.div`

`
const RollText = styled.span`

`

const PlayerContainer = (props: {player: Player, roll: number | null}) => (
    <PlayerWrapper>
        <PlayerLargeText color={props.player.color}>{props.player.name}</PlayerLargeText>
        { props.roll && (
            <RollText>{props.roll}</RollText>
        )}
    </PlayerWrapper>
)

type TurnOrderCheckProps = {
    onSubmit: (payload: PlayerSelectionPayload) => void,
    players: PlayerSelectionPayload
}

const TurnOrderCheck = (props: TurnOrderCheckProps) => {
    const { players, onSubmit } = props
    const { player1, player2 } = players
    const [player1Roll, setPlayer1Roll] = useState<number | null>(null)
    const [player2Roll, setPlayer2Roll] = useState<number | null>(null)

    const doRoll = async () => {
        const p1 = standardRoll()
        setPlayer1Roll(p1)
        await sleep(500)
        const p2 = standardRoll()
        setPlayer2Roll(p2)
        await sleep(500)
        if (p1 > p2) {
            player1.goesFirst = true
            onSubmit({player1, player2})
        } else if( p2 > p1) {
            player2.goesFirst = true
            onSubmit({player1, player2})
        } else {
            await doRoll()
        }
    }

    return (
        <ModalWrapper>
            <PlayerContainer player={player1} roll={player1Roll} />
            <PlayerContainer player={player2} roll={player2Roll} />
            <button onClick={doRoll}>Roll!</button>
        </ModalWrapper>
    )
}

export const getPlayerPrecedence = async (players: PlayerSelectionPayload) => {
    return new Promise<PlayerSelectionPayload>((resolve, reject) => {
        const g = getGame()
        const onSuccess = (payload: PlayerSelectionPayload) => {
            g.removeUI(name)
            g.refresh()
            resolve(payload)
        }
        g.addUI(name, (
            <TurnOrderCheck onSubmit={onSuccess} players={players} />
        ))
        g.refresh()
    })
}