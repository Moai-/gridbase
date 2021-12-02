import { isEmptyTile } from "./utils"

const directions = ['left', 'up', 'right', 'down']

export class Character {
    constructor(name, x, y, color = 'red') {
        this.name = name
        this.x = x
        this.y = y
        this.color = color
        this.selected = false
        this.direction = 'down'
        this.stats = {
            vitality: 1,
            movement: 1,
            strength: 1,
        }
        this.currentStats = {
            vitality: 1,
            movement: 1,
            strength: 1,
        }
    }

    getAdjacentTiles(game) {
        return game.getCellsAround(this.name)
    }

    getControlZoneTiles(game) {
        const cardinals = game.getCellsAroundDirs(this.name)
        switch(this.direction) {
            case 'up': 
                return [cardinals.NW, cardinals.N, cardinals.NE]
            case 'left':
                return [cardinals.NW, cardinals.W, cardinals.SW]
            case 'right':
                return [cardinals.NE, cardinals.E, cardinals.SE]
            default:
                return [cardinals.SW, cardinals.S, cardinals.SE]
        }
    }

    turn(direction, game){
        const curIdx = directions.indexOf(this.direction)
        let nextIdx = 0
        if (direction === 'left') {
            nextIdx = curIdx + 1 === directions.length ? 0 : curIdx + 1
        } else {
            nextIdx = curIdx - 1 < 0 ? directions.length -1 : curIdx - 1
        }
        game.turnCharacter(this.name, directions[nextIdx])
    }

    move(cardinal, game) {
        const moveTo = (x, y) => {
            if (!isEmptyTile(this.gridAt(x, y))) return
            game.moveCharacter(this.name, x, y)
        }
        switch(cardinal) {
            case 'NW':
                moveTo(this.x - 1, this.y - 1)
            break
            case 'N':
                moveTo(this.x, this.y - 1)
            break
            case 'NE':
                moveTo(this.x + 1, this.y - 1)
            break
            case 'E': 
                moveTo(this.x + 1, this.y)
            break
            case 'W': 
                moveTo(this.x - 1, this.y)
            break
            case 'SW':
                moveTo(this.x - 1, this.y + 1)
            break
            case 'S':
                moveTo(this.x, this.y + 1)
            break
            case 'SE':
                moveTo(this.x + 1, this.y + 1)
            break
            default:
            break
        }
    }
}

export const generateCharacters = () => {
    const John = new Character('John', 3, 1, 'cyan')
    const Kevin = new Character('Kevin', 4, 1, 'cornflowerblue')
    const Marcus = new Character('Marcus', 4, 8, 'red')
    const Nick = new Character('Nick', 3, 8, 'maroon')
    Nick.direction = 'up'
    Marcus.direction = 'up'
    return [John, Kevin, Marcus, Nick]
}