// import { isCharacter } from './utils'
import { GridEntity } from './gridEntity'
// import { GridCell } from './gridCell'
import { Grid } from './grid'
import { Location } from './types'
import { theme, Theme } from './defaultTheme'

// const squaresToDirectionsMap = ['NW', 'N', 'NE', 'W', 'E', 'SW', 'S', 'SE']

type EntityMap = {
    [key: string]: GridEntity
}

type RefreshBoard = () => void

type EntityFilter = (entity: GridEntity) => boolean

type EntitySelector = string | EntityFilter

export class Game {

    grid: Grid
    entities: EntityMap
    refresh: RefreshBoard
    theme: Theme

    constructor() {
        this.grid = new Grid()
        this.entities = {}
        this.refresh = () => {}
        this.theme = theme
    }

    addTheme(theme: Theme) {
        this.theme = this.theme.merge(theme)
    }

    getEntityById(id: string) {
        if (this.entities[id]) {
            return this.entities[id]
        } else {
            return null
        }
    }

    findEntitiesByFilter(filterFn: EntityFilter) {
        return Object.values(this.entities).filter(filterFn)
    }

    getEntity(selector: EntitySelector){
        if (typeof selector === 'string') {
            return this.getEntityById(selector)
        } else {
            const entities = this.findEntitiesByFilter(selector)
            if (!entities.length) {
                console.warn(`Could not find entity with selector ${selector}`)
                return null
            } else {
                return entities[0]
            }
        }
    }

    setRefresh(cb: RefreshBoard) {
        this.refresh = cb
    }

    renderGrid(width: number, height: number) {
        this.grid = new Grid()
        this.grid.generate(width, height)
        this.refresh()
    }

    addEntity(entity: GridEntity, loc?: Location) {
        this.entities[entity.id] = entity
        if (loc) {
            this.grid.cellAt(loc).addEntity(entity)
            this.refresh()
        } else {
            this.grid.cellUnplaced().addEntity(entity)
        }
    }

    moveEntity(selector: EntitySelector, targetLoc: Location) {
        const entity = this.getEntity(selector)
        if (entity) {
            this.grid.cellAt(entity.loc).removeEntity(entity)
            this.grid.cellAt(targetLoc).addEntity(entity)
            entity.moveTo(targetLoc)
            this.refresh()
        }
    }

    // addCharacter(character) {
    //     const {x, y, name} = character
    //     this.setGridAt(character, x, y)
    //     this.entities[name] = character
    //     this.refresh()
    // }

    // moveCharacter(name, newX, newY) {
    //     const {x, y} = this.entities[name]
    //     this.grid[x][y] = null
    //     this.setGridAt(this.entities[name], newX, newY)
    //     this.entities[name].x = newX
    //     this.entities[name].y = newY
    //     this.refresh()
    // }

    // turnCharacter(name, direction) {
    //     this.entities[name].direction = direction
    //     this.refresh()
    // }

    // gridAt(x, y) {
    //     if (this.grid[x]) {
    //         if (this.grid[x][y] || this.grid[x][y] === null) {
    //             return this.grid[x][y]
    //         }
    //     }
    //     return -1
    // }

    // toggleSelectChar(name) {
    //     if (this.selectedChar) {
    //         if (name === this.selectedChar) {
    //             this.selectedChar = ''
    //             this.entities[name].selected = false
    //         } else {
    //             this.entities[this.selectedChar].selected = false
    //             this.entities[name].selected = true
    //             this.selectedChar = name
    //         }
    //     } else {
    //         this.selectedChar = name
    //         this.entities[name].selected = true
    //     }
    //     this.refresh()
    // }

    // getCellsAround(name) {
    //     // the long, obvious way to do this
    //     // squares are named like this (where c is the tested character)
    //     // 0, 1, 2
    //     // 3, c, 4
    //     // 5, 6, 7
    //     const {x, y} = this.entities[name]
    //     const sq0 = this.gridAt(x - 1, y - 1)
    //     const sq1 = this.gridAt(x, y - 1)
    //     const sq2 = this.gridAt(x + 1, y - 1)
    //     const sq3 = this.gridAt(x - 1, y)
    //     const sq4 = this.gridAt(x + 1, y)
    //     const sq5 = this.gridAt(x - 1, y + 1)
    //     const sq6 = this.gridAt(x, y + 1)
    //     const sq7 = this.gridAt(x + 1, y + 1)
    //     return [sq0, sq1, sq2, sq3, sq4, sq5, sq6, sq7]
    // }

    // getCellsAroundDirs(name) {
    //     const cells = this.getCellsAround(name)
    //     const dirs = {}
    //     cells.forEach((cell, idx) => dirs[squaresToDirectionsMap[idx]] = cell)
    //     return dirs
    // }

    // getCharactersAround(name) {
    //     this.getCellsAround(name).filter(isCharacter)
    // }

    // getCol(x) {
    //     return this.grid[x]
    // }

    // getRow(y) {
    //     const row = []
    //     for( const col of this.grid) {
    //         row.push(col[y])
    //     }
    //     return row
    // }


}

