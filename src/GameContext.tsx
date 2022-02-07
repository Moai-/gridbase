import React from 'react'
import { Game, ListenerType, DropListenerRecord as DLR } from './engine/game'

export const GameContext = React.createContext<Game | null>(null)

let nonReactContext: Game = new Game()

export const setGame = (game: Game) => {
    nonReactContext = game
}

export const getGame = () => nonReactContext

export { ListenerType }

export type DropListenerRecord = DLR