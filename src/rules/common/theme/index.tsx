import { Rectangle } from './rectangle'
import { RectanglePiece } from './rectanglePiece'
import { Character } from './character'
import { Theme } from '../../../engine/theme'

const theme = new Theme({
    'rectangle': Rectangle,
    'rectanglePiece': RectanglePiece,
    'character': Character
})

export { 
    Rectangle, 
    RectanglePiece, 
    Character,
    theme,
    Theme
}