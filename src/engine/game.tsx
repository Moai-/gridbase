// import { isCharacter } from './utils'
import { GridEntity } from './gridEntity'
// import { GridCell } from './gridCell'
import { Grid } from './grid'
import { Location } from './types'
import { theme, Theme } from './defaultTheme'
import React from 'react'


type EntityMap = {
    [key: string]: GridEntity
}

type RefreshBoard = () => void

type EntityFilter = (entity: GridEntity) => boolean

type EntitySelector = string | EntityFilter

type UIMap = {
    [key: string]: React.ReactElement
}

export class Game {

    grid: Grid
    entities: EntityMap
    refresh: RefreshBoard
    theme: Theme
    ui: UIMap

    constructor() {
        this.grid = new Grid()
        this.entities = {}
        this.refresh = () => {}
        this.theme = theme
        this.ui = {}
    }

    addUI(name: string, element: React.ReactElement) {
        this.ui[name] = element
    }

    removeUI(name: string) {
        if (this.ui[name]) {
            delete this.ui[name]
        }
    }

    getUIRender(){
        return Object
            .keys(this.ui)
            .map((key) => {
                return (
                    <div key={key}>
                        {this.ui[key]}
                    </div>
                )
            })
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

    setupGrid(width: number, height: number) {
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

    removeEntity(entity: GridEntity) {
        const { [entity.id]: remove, ...rest } = this.entities
        this.entities = rest
        this.grid.cellAt(entity.loc).removeEntity(entity)
    }

    moveEntity(selector: EntitySelector, targetLoc: Location) {
        const entity = this.getEntity(selector)
        if (entity) {
            this.grid.cellAt(entity.loc).removeEntity(entity)
            this.grid.cellAt(targetLoc).addEntity(entity)
            this.refresh()
        }
    }

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
}

