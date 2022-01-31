import { Game } from '../../engine/game'
import { Rectangle } from './rectangle'
import { theme } from './theme'

const addStartingAreas = (g: Game) => {
    const redProps = {
        border: '1px solid red',
        color: 'red',
        transparent: true
    }
    const red = new Rectangle({x: 0, y: 0}, {x: 9, y: 1}, redProps)
    red.addSelfToGame(g)
    const blueProps = {
        border: '1px solid blue',
        color: 'blue',
        transparent: true
    }
    const blue = new Rectangle({x: 0, y: 8}, {x: 9, y: 9}, blueProps)
    blue.addSelfToGame(g)
}

export const adoptRules = () => {
    const g = new Game()
    g.addTheme(theme)
    g.renderGrid(10, 10)
    addStartingAreas(g)
    return g
}