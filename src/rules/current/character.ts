import { GridEntity } from '../../engine'

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

export class Character extends GridEntity {

  // name: string
  // color: string
  // selected: boolean
  // direction: Direction

  // constructor(name: string, x: number, y: number, id?: string, color = "red",) {
  //   super(x, y, id)
  //   this.name = name
  //   this.x = x
  //   this.y = y
  //   this.color = color
  //   this.selected = false
  //   this.direction = Direction.DOWN
  // }

  // getControlZoneTiles(game) {
  //   const cardinals = game.getCellsAroundDirs(this.name)
  //   switch (this.direction) {
  //     case "up":
  //       return [cardinals.NW, cardinals.N, cardinals.NE]
  //     case "left":
  //       return [cardinals.NW, cardinals.W, cardinals.SW]
  //     case "right":
  //       return [cardinals.NE, cardinals.E, cardinals.SE]
  //     default:
  //       return [cardinals.SW, cardinals.S, cardinals.SE]
  //   }
  // }

  // turn(direction, game) {
  //   const curIdx = directionOrder.indexOf(this.direction)
  //   let nextIdx = 0
  //   if (direction === Direction.LEFT) {
  //     nextIdx = curIdx + 1 === directionOrder.length ? 0 : curIdx + 1
  //   } else {
  //     nextIdx = curIdx - 1 < 0 ? directionOrder.length - 1 : curIdx - 1
  //   }
  //   game.turnCharacter(this.name, directionOrder[nextIdx])
  // }

  // move(cardinal, game) {
  //   const moveTo = (x, y) => {
  //     if (!isEmptyTile(game.gridAt(x, y))) return
  //     game.moveCharacter(this.name, x, y)
  //   }
  //   switch (cardinal) {
  //     case "NW":
  //       moveTo(this.x - 1, this.y - 1)
  //       break
  //     case "N":
  //       moveTo(this.x, this.y - 1)
  //       break
  //     case "NE":
  //       moveTo(this.x + 1, this.y - 1)
  //       break
  //     case "E":
  //       moveTo(this.x + 1, this.y)
  //       break
  //     case "W":
  //       moveTo(this.x - 1, this.y)
  //       break
  //     case "SW":
  //       moveTo(this.x - 1, this.y + 1)
  //       break
  //     case "S":
  //       moveTo(this.x, this.y + 1)
  //       break
  //     case "SE":
  //       moveTo(this.x + 1, this.y + 1)
  //       break
  //     default:
  //       break
  //   }
  // }

  // getLOS(game) {
  //   const { x, y, direction } = this
  //   const max = game.getGridDimensions()
  //   let entities = []
  //   switch (direction) {
  //     case "up":
  //       for (let curY = y - 1; curY >= 0; curY--) {
  //         entities = [...entities, ...game.getRow(curY)]
  //       }
  //       break
  //     case "left":
  //       for (let curX = x - 1; curX >= 0; curX--) {
  //         entities = [...entities, ...game.getCol(curX)]
  //       }

  //       break
  //     case "right":
  //       for (let curX = x + 1; curX < max.x; curX++) {
  //         entities = [...entities, ...game.getCol(curX)]
  //       }
  //       break
  //     default:
  //       for (let curY = y + 1; curY < max.y; curY++) {
  //         entities = [...entities, ...game.getRow(curY)]
  //       }
  //       break
  //   }
  //   return entities.filter((tile) => !isEmptyTile(tile))
  // }
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
