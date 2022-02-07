import { Game } from '../../engine/game'
import { theme } from '../common/theme'
import { setGame } from '../../GameContext'

export const setup = () => {
    const g = new Game()
    g.addTheme(theme)
    g.setupGrid(10, 10)
    setGame(g)
    console.log('Game object below:')
    console.log(g)
    return g
}