import React from 'react'
import { Game } from './engine/game'

export const GameContext = React.createContext<Game | null>(null)

let nonReactContext: Game = new Game()

export const setGame = (game: Game) => {
    nonReactContext = game
}

export const getGame = () => nonReactContext