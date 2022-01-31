import styled from 'styled-components'
import { convertX, convertY } from '../../engine/utils'

const EntitySquare = styled.div`
    width: 78px;
    height: 78px;
    position: absolute;
`
const Entity = (props) => {
    const {posX, posY, color, onClick} = props
    const left = posX * 80
    const top = posY * 80
    const style = props.style || {}
    return (
        <EntitySquare style={{left, top, ...style, backgroundColor: color ? color : undefined}} onClick={onClick} >
            {props.children}
        </EntitySquare>
    )
}

const LetterContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    margin-top: 39%;
`


export default (g, upKey) => {
    const labels = []
    const {width: x, height:y} = g.grid.getDimensions()
    for ( let cellX = 0; cellX < x; cellX++) {
        labels.push(
            <Entity 
                key={`label-${cellX}-n`} 
                posX={cellX} 
                posY={-1}
            >
                <LetterContainer>{convertX(cellX)}</LetterContainer>
            </Entity>
        )
    }
    for (let cellY = 0; cellY < y; cellY++){
        labels.push(
            <Entity 
                key={`label-n-${cellY}`} 
                posX={-1} 
                posY={cellY}
            >
                <LetterContainer>{convertY(cellY)}</LetterContainer>
            </Entity>
        )
    }
    return labels
}