import { pickBy, mapValues } from 'lodash'
import { TileMap } from '../tile_map'
import { Action } from '../action'
import { Vec2 } from '../vec2'

export class Fall extends Action {
  constructor(tileMap, actor) {
    super(tileMap, actor)
    this.color = '#3498db'
  }

  get tiles() {
    return mapValues(pickBy(TileMap.directions, (d) => d.equals(this.actor.state.potential)), (v) => v.add(this.actor.position))
  }

  afterState(prevState) {
    if (prevState.potential.y > 0 && this.tileMap.isGrounded(prevState.position)) {
      prevState.potential.y = 0
    } else if (!this.tileMap.isGrounded(prevState.position)) {
      prevState.potential.add(Vec2.create(0, 1))
    }

    return prevState
  }
}
