import styled from 'styled-components'
import { EntityRenderer } from '../theme'

const EntitySquare = styled.div`
    width: 78px;
    height: 78px;
    position: absolute;
`

export const GridEntity: EntityRenderer = (props) => {
    const { entity, style, children } = props
    const {x, y} = entity.loc
    const left = x * 80
    const top = y * 80
    return (
        <EntitySquare style={{left, top, ...style}}>
            {children}
        </EntitySquare>
    )
}