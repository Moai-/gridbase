
import { Game } from '../../engine/game'
import { Rectangle } from './rectangle'
import { theme } from './theme'
import { getPlayers } from './ui/playerSelection'
import { Character, Direction } from './character'
import { setGame } from '../../GameContext'

const sleep = (ms: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
}

const addStartingArea = (g: Game, color: string, isTop?: boolean) => {
    const props = {
        border: `1px solid ${color}`,
        color,
        transparent: true
    }
    const coords = isTop ? 
        [ {x: 0, y: 0}, {x: 9, y: 1} ] :
        [ {x: 0, y: 8}, {x: 9, y: 9} ]
    
    const area = new Rectangle(coords[0], coords[1], props)
    area.addSelfToGame(g)
}

export const adoptRules = () => {
    const g = new Game()
    g.addTheme(theme)
    g.renderGrid(10, 10)
    addStartingArea(g, 'red', true)
    addStartingArea(g, 'blue')
    setTimeout(async () => {
        const players = await getPlayers()
        console.log(players)
        const testGuy = new Character('Kang', {x: 4, y: 2})
        g.addEntity(testGuy, {x: 4, y: 2})
        await sleep(1000)
        testGuy.moveTo({x: 4, y: 3})
        await sleep(1000)
        testGuy.turn(Direction.LEFT)
    })
    setGame(g)
    return g
}