import { Location } from './types'

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

  moveTo(loc: Location) {
      this.loc = loc
  }
}