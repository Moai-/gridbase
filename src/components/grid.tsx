import styled from 'styled-components'
import generateGrid from './generators/grid'
import generateCharacters from './generators/characters'
import generateLabels from './generators/gridLabels'
import { Game } from '../engine/game'

const GridOutline = styled.div`
    border: 4px solid black;
    position: relative;
`
type GridProps = {
    game: Game,
    updateKey: string
}
export const Grid = (props: GridProps) => {

    const {game, updateKey} = props
    if (game) {
        const {width, height} = game.grid.getDimensions()
        const outlineStyle = {
            width: width * 80,
            height: height * 80
        }
    
        return (
            <GridOutline key={updateKey} style={outlineStyle}>
                {generateGrid(game, updateKey)}
                {generateCharacters(game, updateKey)}
                {generateLabels(game, updateKey)}
            </GridOutline>
        )
    }
    return (
        <></>
    )
}