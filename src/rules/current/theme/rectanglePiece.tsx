import { GridEntity } from '../../../engine/defaultTheme'
import { EntityRenderer } from '../../../engine/theme'
import { Rectangle } from '../rectangle'

export const RectanglePiece: EntityRenderer = (props) => {
    const { entity } = props
    const { border, color, transparent } = (entity as Rectangle).props
    let style: React.CSSProperties = {}
    if ( border.length ) {
        const [borderWidth, borderStyle, borderColor] = border.split(' ')
        style = {borderWidth, borderStyle, borderColor}
    }
    if ( color ) {
        style.backgroundColor = color
    }
    if ( transparent ) {
        style.opacity = 0.3
    }
    return (
        <GridEntity {...props} style={style} />
    )
}