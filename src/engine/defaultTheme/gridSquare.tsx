import { GridEntity } from './gridEntity'
import { EntityRenderer } from '../theme'

export const GridSquare: EntityRenderer = (props) => {
    const style = {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'black',
    }
    return (
        <GridEntity {...props} style={style} />
    )
}