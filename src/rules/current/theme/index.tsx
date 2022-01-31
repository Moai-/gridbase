import { Rectangle } from './rectangle'
import { RectanglePiece } from './rectanglePiece'
import { Theme } from '../../../engine/theme'

const theme = new Theme({
    'rectangle': Rectangle,
    'rectanglePiece': RectanglePiece,
})

export { 
    Rectangle, 
    RectanglePiece, 
    theme,
    Theme
}