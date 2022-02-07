import { Location } from './types'
import { getGame } from '../GameContext'

export const unplacedLocation: Location = {
    x: -1,
    y: -1
}

export class GridEntity {

  id: string
  renderType: string
  loc: Location
  zIndex: number

  constructor(loc?: Location, id?: string) {
    this.id = id || `${Math.random() * Date.now()}`
    this.loc = loc || unplacedLocation
    this.renderType = 'entity'
    this.zIndex = 0
  }

  drop() {
    const g = getGame()
    g.onDrop(g.grid.cellAt(this.loc))
  }

  moveTo(loc: Location) {
      const g = getGame()
      g.moveEntity(this.id, loc)
      this.loc = loc
  }
}