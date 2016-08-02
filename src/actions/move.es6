import { pickBy, values } from 'lodash'
import { Vec2 } from '../vec2'
import { Action } from '../action'
import { TileMap } from '../tile_map'
import { Actor } from '../actor'

export class Move extends Action {
  constructor(tileMap, actor) {
    super(tileMap, actor)
    this.color = '#cccccc'
  }

  get tiles() {
    return pickBy(TileMap.directions, (d) => this.tileMap.isGrounded(d.add(this.actor.position)))
  }

  get stateMutations() {
    return { position: values(this._selected)[0] || Vec2.create() }
  }
}
