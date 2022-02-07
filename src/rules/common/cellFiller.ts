import { GridEntity, Location, GridCell } from '../../engine'
import { getGame } from '../../GameContext'
import { RectanglePiece, RectangleProps, defaultRectangleProps } from './rectangle'

type Fillable = Location[] | GridCell[]

// Very similar to rectangle except instead of limit squares, accepts an array of cells or locations to fill
export class CellFiller extends GridEntity {
    pieces: GridEntity[]
    props: RectangleProps
    constructor(fillable: Fillable, props?: RectangleProps, id?: string) {
        if ( !fillable.length ) {
            throw new Error('CellFiller needs something to fill!')
        }
        const fillableLocs = fillable.map((point: Location | GridCell) => {
            if (point instanceof GridCell) {
                return point.loc
            }
            return point
        })
        super(fillableLocs[0], id)
        this.renderType = 'rectangle'
        this.pieces = []
        this.props = props || defaultRectangleProps
        for(const loc of fillableLocs) {
            this.pieces.push(new RectanglePiece(loc, this.id, this.props))
        }
    }

    addToBoard() {
        const g = getGame()
        g.addEntity(this)
        for (const piece of this.pieces) {
            g.grid.cellAt(piece.loc).addEntity(piece)
        }
        g.refresh()
    }

    removeFromBoard() {
        const g = getGame()
        g.removeEntity(this)
        for (const piece of this.pieces) {
            g.grid.cellAt(piece.loc).removeEntity(piece)
        }
        g.refresh()
    }
}