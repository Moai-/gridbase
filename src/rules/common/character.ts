import { GridEntity, GridCell } from '../../engine'
import { Location } from '../../engine/types'
import { getGame, ListenerType, DropListenerRecord } from '../../GameContext'
import { CellFiller } from './cellFiller'
import { sameLoc } from './scripts'

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

type ZoneId = {
  type: ZoneType,
  id: string
}

enum ZoneType {
  WALKABLE,
  OCCUPIED,
}

const findZone = (zoneType: ZoneType) => (zone: ZoneId) => zone.type === zoneType
const removeZone = (zoneType: ZoneType) => (zone: ZoneId) => zone.type !== zoneType

export class Character extends GridEntity {

  name: string
  color: string
  selected: boolean
  direction: Direction
  zoneIds: ZoneId[]
  dropListener: null | DropListenerRecord

  constructor(name: string, loc: Location, id?: string) {
    super(loc, id)
    this.name = name
    this.selected = false
    this.direction = Direction.DOWN
    this.renderType = 'character'
    this.zoneIds = []
    this.dropListener = null
  }

  drawWalkZone(){
    this.removeWalkZone()
    const controlTiles = this.getControlZoneTiles()

    const occupiedTiles = controlTiles.filter(tile => tile.findEntity(entity => entity.renderType === 'character').length)
    if (occupiedTiles.length) {
      const occupiedProps = {
        border: `1px solid yellow`,
        color: 'yellow',
        transparent: true
      }
      const occupiedZone = new CellFiller(occupiedTiles, occupiedProps)
      this.zoneIds = [...this.zoneIds, {
        type: ZoneType.OCCUPIED,
        id: occupiedZone.id
      }]
      occupiedZone.addToBoard()
    }
    
    const walkableTiles = controlTiles.filter(tile => tile.findEntity(entity => entity.renderType === 'character').length === 0)
    if (walkableTiles.length) {
      const props = {
        border: `1px solid darkgreen`,
        color: 'green',
        transparent: true
      }
      const walkZone = new CellFiller(walkableTiles, props)
      this.zoneIds = [...this.zoneIds, {
        type: ZoneType.WALKABLE,
        id: walkZone.id
      }]
      walkZone.addToBoard()
    }

  }

  removeWalkZone(){
    const g = getGame()
    const [wz] = this.zoneIds.filter(findZone(ZoneType.WALKABLE))
    const [oz] = this.zoneIds.filter(findZone(ZoneType.OCCUPIED))
    if (wz) {
      const walkZone = (g.getEntityById(wz.id) as CellFiller)
      walkZone.removeFromBoard()
      this.zoneIds = this.zoneIds.filter(removeZone(ZoneType.WALKABLE))
    }
    if (oz) {
      const occupiedZone = (g.getEntityById(oz.id) as CellFiller)
      occupiedZone.removeFromBoard()
      this.zoneIds = this.zoneIds.filter(removeZone(ZoneType.OCCUPIED))
    }
  }

  activate() {

    const g = getGame()

    this.dropListener = g.listen(ListenerType.DRAG, (cell) => {
      const [oz] = this.zoneIds.filter(findZone(ZoneType.OCCUPIED))
      if (oz) {
        const occupiedZone = (g.getEntityById(oz.id) as CellFiller)
        for( const piece of occupiedZone.pieces ) {
          if (sameLoc(piece.loc, cell.loc)) {
            return
          }
        }
      }
      this.moveTo(cell.loc)
      this.drawWalkZone()
    })
    this.selected = true
    this.drawWalkZone()

  }

  deactivate() {
      
    const g = getGame()

    if (this.dropListener) {
      g.unlisten(this.dropListener)
      this.dropListener = null
    }
    this.selected = false
    this.removeWalkZone()

  }

  addToBoard() {
    const g = getGame()
    g.addEntity(this, this.loc)
    g.refresh()
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

  turnTo(direction: Direction) {
    this.direction = direction
    this.drawWalkZone()
  }

  turn(direction: Direction) {
    const curIdx = directionOrder.indexOf(this.direction)
    let nextIdx = 0
    if (direction === Direction.LEFT) {
      nextIdx = curIdx + 1 === directionOrder.length ? 0 : curIdx + 1
    } else {
      nextIdx = curIdx - 1 < 0 ? directionOrder.length - 1 : curIdx - 1
    }
    this.turnTo(directionOrder[nextIdx])
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
