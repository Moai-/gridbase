import { GridCell } from './gridCell'
import { Location } from './types'
import { unplacedLocation } from './gridEntity'
import { GridSquare } from './gridSquare'
import { getGame } from '../GameContext'

export class Grid {
    rows: Array<Array<GridCell>>
    unplacedEntities: GridCell = new GridCell(unplacedLocation)
    show: boolean

    constructor() {
        this.rows = []
        this.show = false
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
        console.log('loc invalid! current rows', this.rows.length)
        throw new Error(`Invalid coordinate: x${loc.x}, y${loc.y}`)
    }

    cellUnplaced() {
        return this.unplacedEntities
    }
    
    getDimensions() {
        const width = this.rows.length
        const height = this.rows[parseInt(Object.keys(this.rows)[0], 10)].length
        return { width, height }
    }

    getCol(x: number) {
        return this.rows[x]
    }

    getRow(y: number) {
        const row = []
        for( const col of this.rows) {
            row.push(col[y])
        }
        return row
    }

    showBoard() {
        this.show = true
        getGame().refresh()
    }

    hideBoard() {
        this.show = false
        getGame().refresh()
    }
}