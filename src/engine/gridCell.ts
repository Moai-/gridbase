import { getGame } from '../GameContext'
import { GridEntity } from './gridEntity'
import { Location } from './types'

type EntityFilter = (entity: GridEntity) => boolean

export class GridCell {
    contents: GridEntity[]
    loc: Location

    constructor(loc: Location, contents?: GridEntity[]){
        this.loc = loc
        this.contents = contents || []
    }

    drop() {
        const g = getGame()
        g.onDrop(this)
    }

    hasEntity(entity: GridEntity) {
        for (const element of this.contents ) {
            if (element.id === entity.id) return element
        }
        return null
    }

    findEntity(filter: EntityFilter) {
        return this.contents.filter(filter)
    }

    removeEntity(entity: GridEntity) {
        if (this.hasEntity(entity)) {
            this.contents = this.contents.filter((element) => element.id !== entity.id)
        }
    }

    addEntity(entity: GridEntity) {
        if (!this.hasEntity(entity)) {
            this.contents = [...this.contents, entity].sort((ent1, ent2) => ent1.zIndex - ent2.zIndex )
        }
    }

}
