import { isCharacter } from "./utils"

const squaresToDirectionsMap = ['NW', 'N', 'NE', 'W', 'E', 'SW', 'S', 'SE']

export class Game {
    constructor() {
        this.grid = []
        this.characters = {}
        this.refresh = () => {}
        this.selectedChar = ''
    }

    setRefresh(cb) {
        this.refresh = cb
    }

    setGrid(x, y) {
        this.grid = []
        for (let width = 0; width < x; width++) {
            let gridlet = []
            for( let height = 0; height < y; height++ ) {
                gridlet.push(null)
            }
            this.grid.push(gridlet)
        }
        for ( const charName of Object.keys(this.characters)) {
            const {x, y} = this.characters[charName]
            this.setGridAt(this.characters[charName], x, y)
        }
        this.refresh()
    }

    addCharacter(character) {
        const {x, y, name} = character
        this.setGridAt(character, x, y)
        this.characters[name] = character
        this.refresh()
    }

    moveCharacter(name, newX, newY) {
        const {x, y} = this.characters[name]
        this.grid[x][y] = null
        this.setGridAt(this.characters[name], newX, newY)
        this.characters[name].x = newX
        this.characters[name].y = newY
        this.refresh()
    }

    turnCharacter(name, direction) {
        this.characters[name].direction = direction
        this.refresh()
    }

    gridAt(x, y) {
        if (this.grid[x]) {
            if (this.grid[x][y] || this.grid[x][y] === null) {
                return this.grid[x][y]
            }
        }
        return -1
    }

    setGridAt(entity, x, y) {
        if (this.gridAt(x, y) === -1) return undefined
        this.grid[x][y] = entity
        return entity
    }

    toggleSelectChar(name) {
        if (this.selectedChar) {
            if (name === this.selectedChar) {
                this.selectedChar = ''
                this.characters[name].selected = false
            } else {
                this.characters[this.selectedChar].selected = false
                this.characters[name].selected = true
                this.selectedChar = name
            }
        } else {
            this.selectedChar = name
            this.characters[name].selected = true
        }
        this.refresh()
    }

    getCellsAround(name) {
        // the long, obvious way to do this
        // squares are named like this (where c is the tested character)
        // 0, 1, 2
        // 3, c, 4
        // 5, 6, 7
        const {x, y} = this.characters[name]
        const sq0 = this.gridAt(x - 1, y - 1)
        const sq1 = this.gridAt(x, y - 1)
        const sq2 = this.gridAt(x + 1, y - 1)
        const sq3 = this.gridAt(x - 1, y)
        const sq4 = this.gridAt(x + 1, y)
        const sq5 = this.gridAt(x - 1, y + 1)
        const sq6 = this.gridAt(x, y + 1)
        const sq7 = this.gridAt(x + 1, y + 1)
        return [sq0, sq1, sq2, sq3, sq4, sq5, sq6, sq7]
    }

    getCellsAroundDirs(name) {
        const cells = this.getCellsAround(name)
        const dirs = {}
        cells.forEach((cell, idx) => dirs[squaresToDirectionsMap[idx]] = cell)
        return dirs
    }

    getCharactersAround(name) {
        this.getCellsAround(name).filter(isCharacter)
    }

    getGridDimensions() {
        const x = this.grid.length
        const y = this.grid[Object.keys(this.grid)[0]].length
        return {x, y}
    }

    getRow(x) {
        return this.grid[x]
    }

    getCol(y) {
        const row = []
        for( const col of this.grid) {
            row.push(col[y])
        }
        return row
    }


}

