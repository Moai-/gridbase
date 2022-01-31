import { EntityRenderer } from '../theme'
import { GridEntity } from './gridEntity'

export const Nothing: EntityRenderer = (props) => {
    return (
        <GridEntity entity={props.entity}>
            <div>
                Missing render for {props.entity.renderType}
            </div>
        </GridEntity>
    )
}