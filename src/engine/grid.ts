import { GridCell } from './gridCell'
import { Location } from './types'
import { unplacedLocation } from './gridEntity'
import { GridSquare } from './gridSquare'

export class Grid {
    rows: Array<Array<GridCell>>
    unplacedEntities: GridCell = new GridCell(unplacedLocation)

    constructor() {
        this.rows = []
    }

    generate(widthX: number, heightY: number) {
        for (let x = 0; x < widthX; x++) {
            let col = []
            for( let y = 0; y < heightY; y++ ) {
                const cell = new GridCell({ x, y })
                cell.addEntity(new GridSquare({ x, y }))
                col.push(cell)
            }
            this.rows.push(col)
        }
    }

    cellAt(loc: Location) {
        if (loc.x === unplacedLocation.x && loc.y === unplacedLocation.y) {
            return this.unplacedEntities
        }
        if ( this.rows[loc.x] ) {
            if ( this.rows[loc.x][loc.y] ) {
                return this.rows[loc.x][loc.y]
            }
        }
        throw new Error(`Invalid coordinate: x${loc.x}, y${loc.y}`)
    }

    cellUnplaced() {
        return this.unplacedEntities
    }
    
    getDimensions() {
        const width = this.rows.length
        const height = this.rows[parseInt(Object.keys(this.rows)[0], 10)].length
        return {width, height}
    }

}