import { GridEntity } from '.'
import { Location } from './types'

export class GridSquare extends GridEntity {
    constructor(loc?: Location, id?: string) {
        super(loc, id)
        this.renderType = 'gridSquare'
    }
}