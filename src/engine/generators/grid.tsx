import { Game } from '../game'

export const generateGrid = (g: Game, upKey: string) => {
    const grid = []
    if (g.grid.show) {
        for ( const cellX in g.grid.rows ) {
            for ( const cellY in g.grid.rows[cellX] ) {
                const cell = g.grid.rows[cellX][cellY]
                for (const entity of cell.contents) {
                    const ReactElement = g.theme.getRender(entity.renderType)
                    grid.push(
                        <ReactElement entity={entity} key={`${entity.renderType}-${cellX}-${cellY}`} />
                    )
                }
            }
        }
    }
    return grid
}