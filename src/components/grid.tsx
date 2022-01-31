import { useContext } from 'react'
import styled from 'styled-components'
import generateGrid from './generators/grid'
import generateLabels from './generators/gridLabels'
import { GameContext } from '../GameContext'

const GridOutline = styled.div`
    border: 4px solid black;
    position: relative;
`
type GridProps = {
    updateKey: string
}
export const Grid = (props: GridProps) => {
    const game = useContext(GameContext)
    const {updateKey} = props
    if (game) {
        const {width, height} = game.grid.getDimensions()
        const outlineStyle = {
            width: width * 80,
            height: height * 80
        }
    
        return (
            <GridOutline key={updateKey} style={outlineStyle}>
                {generateGrid(game, updateKey)}
                {generateLabels(game, updateKey)}
            </GridOutline>
        )
    }
    return (
        <></>
    )
}