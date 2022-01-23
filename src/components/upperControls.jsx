import styled from 'styled-components'
import { RotateCw, RotateCcw } from 'react-feather'

const ControlGrid = styled.div`
    display: grid;
    grid-template-columns: 100px 100px 100px 100px 100px;
    grid-gap: 10px;
    color: #444;
`

const ControlCell = styled.div`
    background-color: #444;
    color: #fff;
    border-radius: 5px;
    padding: 20px;
    font-size: 150%;
`
const EmptyCell = styled.div`
    padding: 20px;

`

export const UpperControls = (props) => {
    const {game} = props
    const {selectedChar} = game
    const curChar = game.characters[selectedChar]
    const move = (cardinal) => () => curChar && curChar.move(cardinal, game)
    const turn = (direction) => () => curChar && curChar.turn(direction, game)

    return (
        <ControlGrid>

            <EmptyCell />
            <ControlCell>
                <button onClick={move('NW')}>NW</button>
            </ControlCell>
            <ControlCell>
                <button onClick={move('N')}>N</button>
            </ControlCell>
            <ControlCell>
                <button onClick={move('NE')}>NE</button>
            </ControlCell>
            <EmptyCell />

            <ControlCell>
                <button onClick={turn('left')}>Turn <RotateCw /></button>
            </ControlCell>
            <ControlCell>
                <button onClick={move('W')}>W</button>
            </ControlCell>
            <EmptyCell />
            <ControlCell>
                <button onClick={move('E')}>E</button>
            </ControlCell>
            <ControlCell>
                <button onClick={turn('right')}>Turn <RotateCcw /></button>
            </ControlCell>

            <EmptyCell />
            <ControlCell>
                <button onClick={move('SW')}>SW</button>
            </ControlCell>
            <ControlCell>
                <button onClick={move('S')}>S</button>
            </ControlCell>
            <ControlCell>
                <button onClick={move('SE')}>SE</button>
            </ControlCell>
            <EmptyCell />
        </ControlGrid>
    )
}