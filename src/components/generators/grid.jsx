import { GridEntity } from '../common/gridEntity'

export default (g, upKey) => {
    const grid = []
    for ( const cellX in g.grid ) {
        for ( const cellY in g.grid[cellX] ) {
            grid.push(
                <GridEntity 
                    key={`cell-${cellX}-${cellY}`} 
                    id={`cell-${cellX}-${cellY}`}
                    posX={cellX} 
                    posY={cellY}
                />
            )
        }
    }
    return grid
}