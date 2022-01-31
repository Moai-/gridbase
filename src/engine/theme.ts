import React from 'react'
import { GridEntity } from './gridEntity'

type EntityProps = {
    entity: GridEntity
    style?: React.CSSProperties
    children?: React.ReactNode
}

export type EntityRenderer = (props: EntityProps) => React.ReactElement

export type RenderMap = {
    [key: string]: EntityRenderer
}

export class Theme {
    renderMap: RenderMap
    
    constructor(map: RenderMap) {
        this.renderMap = map
    }

    getRender(type: string) {
        if (this.renderMap[type]) {
            return this.renderMap[type]
        } else {
            console.warn('No such render:', type)
            return this.renderMap['nothing']
        }
    }

    merge(otherTheme: Theme) {
        return new Theme({...this.renderMap, ...otherTheme.renderMap})
    }
}