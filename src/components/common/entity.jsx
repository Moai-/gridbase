import styled from 'styled-components'

const EntitySquare = styled.div`
    width: 78px;
    height: 78px;
    position: absolute;
`
export const Entity = (props) => {
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