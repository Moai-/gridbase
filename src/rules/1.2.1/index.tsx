
import { Rectangle } from '../common/rectangle'
import { getPlayers } from '../common/ui/playerSelection'
import { Character, Direction } from '../common/character'
import { standardRoll } from '../common/scripts'
import { setup } from './setup'

const sleep = (ms: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
}

const addStartingArea = (color: string, isTop?: boolean) => {
    const props = {
        border: `1px solid ${color}`,
        color,
        transparent: true
    }
    const coords = isTop ? 
        [ {x: 0, y: 0}, {x: 9, y: 1} ] :
        [ {x: 0, y: 8}, {x: 9, y: 9} ]
    
    const area = new Rectangle(coords[0], coords[1], props)
    area.addToBoard()
    return area
}

export const adoptRules = () => {
    const game = setup()
    setTimeout(async () => {
        const start1 = addStartingArea('red', true)
        const start2 = addStartingArea('blue')
        console.log(standardRoll()())
        const players = await getPlayers()
        game.grid.showBoard()
        console.log(players)
        const testGuy = new Character('Kang', {x: 4, y: 2})
        testGuy.addToBoard()
        await sleep(1000)
        testGuy.moveTo({x: 4, y: 3})
        await sleep(1000)
        testGuy.turn(Direction.LEFT)
        await sleep(1000)
        start1.removeFromBoard()
        start2.removeFromBoard()
        await sleep(1000)
        game.grid.hideBoard()
    })
    return game
}