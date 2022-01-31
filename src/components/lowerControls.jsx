import styled from 'styled-components'
import { generateCharacters } from '../engine/character'

const LowerControlsWrapper = styled.div`
    border: 1px solid black;
    padding: 20px;
    margin: 20px
`

export const LowerControls = (props) => {
    const {game} = props
    const clickGenChars = () => {
        const chars = generateCharacters()
        for( const char of chars ) {
            game.addCharacter(char)
        }
    }
    return (
        <LowerControlsWrapper>
            <button onClick={clickGenChars}>Add characters</button>
        </LowerControlsWrapper>
    )
}