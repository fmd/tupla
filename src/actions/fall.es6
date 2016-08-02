import { TileMap } from '../tile_map'
import { Action } from '../action'
import { Vec2 } from '../vec2'

export class Fall extends Action {
  constructor(tileMap, actor, next) {
    super(tileMap, actor, next)
    this.color = '#3498db'
  }

  beforeState(prevState) {
    if (!this.tileMap.isGrounded(this.actor.position)) {
      prevState.potential.add(Vec2.create(0, 1))
    }

    return prevState
  }

  afterState(prevState) {
    if (prevState.potential.y > 0 && this.tileMap.isGrounded(this.actor.position)) {
      prevState.potential.y = 0
    }

    return prevState
  }
}
