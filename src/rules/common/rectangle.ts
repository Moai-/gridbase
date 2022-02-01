import { GridEntity, Location } from '../../engine'
import { Game } from '../../engine/game'
import { getGame } from '../../GameContext'

type RectangleProps = {
    border: string
    transparent: boolean
    color: string
}

const defaultProps: RectangleProps = {
    border: '1px solid red',
    transparent: true,
    color: 'red'
}

export class RectanglePiece extends GridEntity {
    parentId: string
    props: RectangleProps
    constructor(loc: Location, parentId: string, props?: RectangleProps, id?: string) {
        super(loc, id)
        this.parentId = parentId
        this.renderType = 'rectanglePiece'
        this.props = props || defaultProps
    }
}

export class Rectangle extends GridEntity {
    pieces: GridEntity[]
    props: RectangleProps
    constructor(locStart: Location, locEnd: Location, props?: RectangleProps, id?: string) {
        super(locStart, id)
        this.renderType = 'rectangle'
        this.pieces = []
        this.props = props || defaultProps
        for( let xStart = locStart.x; xStart <= locEnd.x; xStart++ ) {
            for (let yStart = locStart.y; yStart <= locEnd.y; yStart++ ) {
                this.pieces.push(new RectanglePiece({x: xStart, y: yStart}, this.id, this.props))
            }
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