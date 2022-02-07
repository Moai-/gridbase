import { GridEntity } from '../../../engine/defaultTheme'
import { EntityRenderer } from '../../../engine/theme'
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'react-feather'
import { Character as CharacterClass, Direction } from '../character'
import styled from 'styled-components'
import { useDrag } from 'react-dnd'
import { useEffect } from 'react'

const DirectionContainer = styled.div`
    display: flex;
    border-radius: 50%;
    background-color: black;
    width: 50%;
    height: 50%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 26%
`

const DragContainer = styled.div`
    display: block;
    width: 100%;
    height: 100%;
`

const NameLabel = styled.div`
    display: block;
    width: 100%;
    height: 30px;
    background-color: gray;
    color: black;
    position: absolute;
    top: -32px;
    border: 1px solid black;
`

const DirectionSlot = styled.div`
    display: block;
    width: 9px;
    height: 9px;
    border-radius: 5px;
    border: 1px solid black;
    position: absolute;
    margin-left: 4px;
    margin-right: 4px;
    margin-top: -4px;
    z-index: 10;
`

const DirectionDot = styled.div`
    display: block;
    background-color: black;
    border-radius: 5px;
    width: 5px;
    height: 5px;
    margin: 2px;
`

type DirectionProps = {
    children?: React.ReactNode, 
    onClick?: () => void,
}

const DirectionSlotLeft = (props: DirectionProps) => (
    <DirectionSlot 
        onClick={props.onClick}    
        style={{top: '50%', left: 0}}>
            {props.children}
    </DirectionSlot>
)

const DirectionSlotRight = (props: DirectionProps) => (
    <DirectionSlot 
        onClick={props.onClick}    
        style={{top: '50%', right: 0}}>
            {props.children}
    </DirectionSlot>
)

const DirectionSlotBottom = (props: DirectionProps) => (
    <DirectionSlot 
        onClick={props.onClick}    
        style={{bottom: 0, left: '40%'}}>
            {props.children}
    </DirectionSlot>
)

const DirectionSlotTop = (props: DirectionProps) => (
    <DirectionSlot 
        onClick={props.onClick}    
        style={{top: 7, left: '40%'}}>
            {props.children}
    </DirectionSlot>
)

const getDirectionalArrow = (direction: string) => {
    const props = {color: 'white', size: 24, style: {display: 'block', margin: 'auto'}}
    if (direction === 'up') return <ArrowUp {...props} />
    if (direction === 'left') return <ArrowLeft {...props} />
    if (direction === 'right') return <ArrowRight {...props} />
    return <ArrowDown {...props} />
}

const getDirectionalSlots = (char: CharacterClass) => {
    const {direction} = char
    if (direction === 'up') return [
        <DirectionSlotLeft key="1" onClick={() => char.turnTo(Direction.LEFT)} />,
        <DirectionSlotTop key="2">
            <DirectionDot />
        </DirectionSlotTop>,
        <DirectionSlotRight key="3" onClick={() => char.turnTo(Direction.RIGHT)} />
    ]
    if (direction === 'left') return [
        <DirectionSlotTop key="1" onClick={() => char.turnTo(Direction.UP)} />,
        <DirectionSlotLeft key="2">
            <DirectionDot />
        </DirectionSlotLeft>,
        <DirectionSlotBottom key="3" onClick={() => char.turnTo(Direction.DOWN)} />
    ]
    if (direction === 'right' ) return [
        <DirectionSlotTop key="1" onClick={() => char.turnTo(Direction.UP)}/>,
        <DirectionSlotRight key="2">
            <DirectionDot />
        </DirectionSlotRight>,
        <DirectionSlotBottom key="3" onClick={() => char.turnTo(Direction.DOWN)} />
    ]
    return [
        <DirectionSlotLeft key="1" onClick={() => char.turnTo(Direction.LEFT)} />,
        <DirectionSlotBottom key="2">
            <DirectionDot />
        </DirectionSlotBottom>,
        <DirectionSlotRight key="3" onClick={() => char.turnTo(Direction.RIGHT)}/>
    ]
}

export const Character: EntityRenderer = (props) => {
    const entity = props.entity as CharacterClass
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'character',
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging() && entity.selected
        })
      }))
    return (
        <GridEntity entity={entity} key={entity.id}>
            {entity.selected && (
                <NameLabel>
                    {entity.name}
                </NameLabel>
            )}
            {entity.selected && getDirectionalSlots(entity)}
            <DragContainer ref={drag}>
                <DirectionContainer>
                    {getDirectionalArrow(entity.direction)}
                </DirectionContainer>
            </DragContainer>
        </GridEntity>
    )
}