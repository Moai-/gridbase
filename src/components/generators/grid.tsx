import { Game } from '../../engine/game'

export default (g: Game, upKey: string) => {
    const grid = []
    for ( const cellX in g.grid.rows ) {
        for ( const cellY in g.grid.rows[cellX] ) {
            const cell = g.grid.rows[cellX][cellY]
            for (const entity of cell.contents) {
                const ReactElement = g.theme.getRender(entity.renderType)
                grid.push(
                    <ReactElement entity={entity} key={`${entity.renderType}-${cellX}-${cellY}-${upKey}`} />
                )
            }
        }
    }
    return grid
}