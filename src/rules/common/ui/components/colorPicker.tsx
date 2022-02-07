import styled from 'styled-components'
import { ColorResult, GithubPicker } from 'react-color'
import { useState } from 'react'

const Swatch = styled.div`
    width: 18px;
    height: 18px;
    border: 1px solid black;
    border-radius: 25%;
    margin-left: 5px;
    background-color: ${props => props.color};
    margin-bottom: -4px;
    z-index: 0;
`

const ElementContainer = styled.div`
    position: relative;
    display: inline-block;
`

const PickerContainer = styled.div`
    position: absolute;
    margin-top: 12px;
    z-index: 1;
`

export const ColorPicker = (props: {onSubmit: (color: string) => void, value: string}) => {

    const [shouldShowColorPicker, setShouldShowColorPicker] = useState(false)
    const clickSwatch = () => setShouldShowColorPicker(!shouldShowColorPicker)
    const onColorChange = (color: ColorResult) => {
        setShouldShowColorPicker(false)
        props.onSubmit(color.hex)
    }
    return (
        <ElementContainer>
            <Swatch onClick={clickSwatch} color={props.value} />
            { shouldShowColorPicker && (
                <PickerContainer>
                    <GithubPicker onChange={onColorChange} />
                </PickerContainer>
            )}
        </ElementContainer>
    )
}