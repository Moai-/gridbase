import { GridEntity } from './gridEntity'
import { Location } from './types'

export class GridCell {
    contents: GridEntity[]
    loc: Location

    constructor(loc: Location, contents?: GridEntity[]){
        this.loc = loc
        this.contents = contents || []
    }

    hasEntity(entity: GridEntity) {
        for (const element of this.contents ) {
            if (element.id === entity.id) return element
        }
        return null
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
