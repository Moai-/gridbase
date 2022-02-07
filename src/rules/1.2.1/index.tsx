
import { Rectangle } from '../common/rectangle'
import { getPlayers } from '../common/ui/playerSelection'
import { getPlayerPrecedence } from '../common/ui/turnOrderCheck'
import { Character, Direction } from '../common/character'
import { standardRoll, sleep } from '../common/scripts'
import { setup } from './setup'

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
        console.log(standardRoll())
        const players = await getPlayers()
        const precedentedPlayers = await getPlayerPrecedence(players)
        game.grid.showBoard()
        console.log(precedentedPlayers)
        const testGuy = new Character('Kang', {x: 4, y: 2})
        const testGuy2 = new Character('Kangzilla', {x: 7, y: 2})

        testGuy.addToBoard()
        // await sleep(1000)
        // testGuy.moveTo({x: 4, y: 3})
        // await sleep(1000)
        // testGuy.turn(Direction.LEFT)
        await sleep(1000)
        start1.removeFromBoard()
        start2.removeFromBoard()
        testGuy.activate()
        testGuy2.addToBoard()
        // await sleep(1000)
        // game.grid.hideBoard()
    })
    return game
}