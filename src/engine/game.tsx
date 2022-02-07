// import { isCharacter } from './utils'
import { GridEntity } from './gridEntity'
import { GridCell } from './gridCell'
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

type DropListener = (cell: GridCell) => void

export type DropListenerRecord = {
    type: ListenerType,
    listener: DropListener
}

export enum ListenerType {
    CLICK,
    DRAG
}


export class Game {

    grid: Grid
    entities: EntityMap
    refresh: RefreshBoard
    theme: Theme
    ui: UIMap
    dropListeners: DropListenerRecord[]


    constructor() {
        this.grid = new Grid()
        this.entities = {}
        this.refresh = () => {}
        this.theme = theme
        this.dropListeners = []
        this.ui = {}
    }

    onDrop(cell: GridCell) {
        for( const listenerRecord of this.dropListeners ) {
            if (listenerRecord.type === ListenerType.DRAG) {
                listenerRecord.listener(cell)
            }
        }
    }

    listen(type: ListenerType, fn: DropListener) {
        const record: DropListenerRecord = {type, listener: fn}
        this.dropListeners = [...this.dropListeners, record]
        return record
    }

    unlisten(rec: DropListenerRecord) {
        this.dropListeners = [
            ...this.dropListeners.slice(0, this.dropListeners.indexOf(rec)),
            ...this.dropListeners.slice(this.dropListeners.indexOf(rec) + 1)
        ]
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

    refreshAsync() {
        setTimeout(() => {
            this.refresh()
        })
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

