import { GridEntity } from './gridEntity'
import { GridSquare } from './gridSquare'
import { Nothing } from './nothing'
import { Theme } from '..'

const theme = new Theme({
    'gridEntity': GridEntity,
    'gridSquare': GridSquare,
    'nothing': Nothing,
})

export { 
    GridEntity, 
    GridSquare, 
    theme,
    Theme
}