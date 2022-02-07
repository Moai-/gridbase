import { GridEntity } from '../../../engine/defaultTheme'
import { EntityRenderer } from '../../../engine/theme'
import { Rectangle } from '../rectangle'
import { useDrop } from 'react-dnd'
import styled from 'styled-components'

const DropDiv = styled.div`
    display: block;
    width: 100%;
    height: 100%;
    position: relative;
`

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

    const [{ isOver }, drop] = useDrop(
        () => ({
          accept: 'character',
          drop: () => entity.drop(),
          collect: (monitor) => ({
            isOver: !!monitor.isOver()
          })
        }),
        []
    )

    const handleClick = () => {
        
    }

    return (
        <GridEntity {...props} style={style}>
            <DropDiv ref={drop}>
                {props.children}
            </DropDiv>
        </GridEntity>
    )
}