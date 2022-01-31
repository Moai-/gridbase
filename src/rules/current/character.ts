import { GridEntity } from '../../engine'
import { Location } from '../../engine/types'
import { GridCell } from '../../engine'
import { getGame } from '../../GameContext'

const squaresToDirectionsMap = ['NW', 'N', 'NE', 'W', 'E', 'SW', 'S', 'SE']

export enum Direction {
  LEFT = 'left',
  RIGHT = 'right',
  UP = 'up',
  DOWN = 'down'
}

export const directionOrder = [
  Direction.LEFT,
  Direction.UP,
  Direction.RIGHT,
  Direction.DOWN,
]

type Dirs = {
  [key: string]: GridCell
}

export class Character extends GridEntity {

  name: string
  color: string
  selected: boolean
  direction: Direction

  constructor(name: string, loc: Location, id?: string) {
    super(loc, id)
    this.name = name
    this.selected = false
    this.direction = Direction.DOWN
    this.renderType = 'character'
  }

  getCellsAround() {
      // the long, obvious way to do this
      // squares are named like this (where c is the tested character)
      // 0, 1, 2
      // 3, c, 4
      // 5, 6, 7
      const { loc } = this
      const {x, y} = loc
      const g = getGame()
      const sq0 = g.grid.cellAt({x: x - 1, y: y - 1})
      const sq1 = g.grid.cellAt({x, y: y - 1})
      const sq2 = g.grid.cellAt({x: x + 1, y: y - 1})
      const sq3 = g.grid.cellAt({x: x - 1, y})
      const sq4 = g.grid.cellAt({x: x + 1, y})
      const sq5 = g.grid.cellAt({x: x - 1, y: y + 1})
      const sq6 = g.grid.cellAt({x, y: y + 1})
      const sq7 = g.grid.cellAt({x: x + 1, y: y + 1})
      return [sq0, sq1, sq2, sq3, sq4, sq5, sq6, sq7]
  }

  getCellsAroundDirs() {
      const cells = this.getCellsAround()
      const dirs: Dirs = {}
      cells.forEach((cell, idx) => dirs[squaresToDirectionsMap[idx]] = cell)
      return dirs
  }


  getControlZoneTiles() {
    const cardinals = this.getCellsAroundDirs()
    switch (this.direction) {
      case "up":
        return [cardinals.NW, cardinals.N, cardinals.NE]
      case "left":
        return [cardinals.NW, cardinals.W, cardinals.SW]
      case "right":
        return [cardinals.NE, cardinals.E, cardinals.SE]
      default:
        return [cardinals.SW, cardinals.S, cardinals.SE]
    }
  }

  turn(direction: Direction) {
    const curIdx = directionOrder.indexOf(this.direction)
    const g = getGame()
    let nextIdx = 0
    if (direction === Direction.LEFT) {
      nextIdx = curIdx + 1 === directionOrder.length ? 0 : curIdx + 1
    } else {
      nextIdx = curIdx - 1 < 0 ? directionOrder.length - 1 : curIdx - 1
    }
    this.direction = directionOrder[nextIdx]
    g.refresh()
  }

  move(cardinal: string) {
    const game = getGame()
    const moveTo = (x: number, y: number) => {
      const targetLoc = {x, y}
      const hasCharacter = game.grid.cellAt(targetLoc).findEntity((ent) => ent.renderType === this.renderType)
      if (!hasCharacter) {
        this.moveTo(targetLoc)
      }
    }
    const {x, y} = this.loc
    switch (cardinal) {
      case "NW":
        moveTo(x - 1, y - 1)
        break
      case "N":
        moveTo(x, y - 1)
        break
      case "NE":
        moveTo(x + 1, y - 1)
        break
      case "E":
        moveTo(x + 1, y)
        break
      case "W":
        moveTo(x - 1, y)
        break
      case "SW":
        moveTo(x - 1, y + 1)
        break
      case "S":
        moveTo(x, y + 1)
        break
      case "SE":
        moveTo(x + 1, y + 1)
        break
      default:
        break
    }
  }

  getLOS() {
    const game = getGame()
    const { loc, direction } = this
    const max = game.grid.getDimensions()
    let entities: Array<GridCell> = []
    const {x, y} = loc
    switch (direction) {
      case "up":
        for (let curY = y - 1; curY >= 0; curY--) {
          entities = [...entities, ...game.grid.getRow(curY)]
        }
        break
      case "left":
        for (let curX = x - 1; curX >= 0; curX--) {
          entities = [...entities, ...game.grid.getCol(curX)]
        }

        break
      case "right":
        for (let curX = x + 1; curX < max.width; curX++) {
          entities = [...entities, ...game.grid.getCol(curX)]
        }
        break
      default:
        for (let curY = y + 1; curY < max.height; curY++) {
          entities = [...entities, ...game.grid.getRow(curY)]
        }
        break
    }
    return entities
  }
}

export const generateCharacters = () => {
//   const John = new Character("Ulther S", 3, 1, "cornflowerblue")
//   const Kevin = new Character("Johanna S", 4, 2, "cornflowerblue")
//   const Kevin1 = new Character("Kang S", 5, 3, "cornflowerblue")
//   const Kevin2 = new Character("Ziaeddin S", 6, 4, "cornflowerblue")
//   const Nick1 = new Character("Ulther E", 3, 8, "maroon")
//   const Nick2 = new Character("Kang E", 4, 8, "maroon")
//   const Nick3 = new Character("Ziaeddin E", 5, 8, "maroon")
//   const Nick4 = new Character("Neyahual E", 6, 8, "maroon")
// //   Nick.direction = "up"
// //   Marcus.direction = "up"
//   return [John, Kevin, Kevin1, Kevin2, Nick1, Nick2, Nick3, Nick4]
}
