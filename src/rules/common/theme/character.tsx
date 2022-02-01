import { GridEntity } from '../../../engine/defaultTheme'
import { EntityRenderer } from '../../../engine/theme'
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'react-feather'
import { Character as CharacterClass } from '../character'
import styled from 'styled-components'

const DirectionContainer = styled.div`
    display: flex;
    border-radius: 50%;
    background-color: black;
    width: 50%;
    height: 50%;
    margin-left: auto;
    margin-right: auto;
`

const getDirectionalArrow = (direction: string) => {
    const props = {color: 'white', size: 24, style: {display: 'block', margin: 'auto'}}
    if (direction === 'up') return <ArrowUp {...props} />
    if (direction === 'left') return <ArrowLeft {...props} />
    if (direction === 'right') return <ArrowRight {...props} />
    return <ArrowDown {...props} />
}

export const Character: EntityRenderer = (props) => {
    const entity = props.entity as CharacterClass

    return (
        <GridEntity entity={entity}>
            {entity.name}
            <DirectionContainer>
                {getDirectionalArrow(entity.direction)}
            </DirectionContainer>

        </GridEntity>
    )
}