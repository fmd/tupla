import { pickBy, values, merge } from 'lodash'
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
    const position = this.actor.state.position.clone()
    const potential = Vec2.clamp(this.actor.state.potential.clone(), -1, 1)
    return merge(this._moveTiles(position, potential), this._climbTiles(position, potential))
  }

  _moveTiles(position, potential) {
    const directions = pickBy(TileMap.directions, (d) => d.y == potential.y)
    return pickBy(directions, (v) => !this.tileMap.hasTagAt(v.add(position), 'collides'))
  }

  _climbTiles(position, potential) {
    const climbables = pickBy(TileMap.directions, (d) => d.x != 0 && d.y != 0)
    if (potential.y != 0 || !this.tileMap.isGrounded(position)) return {}
    return pickBy(climbables, (v) => this.tileMap.isGrounded(v.add(position)))
  }

  beforeState(prevState) {
    const direction = values(this._selected)[0] || Vec2.clamp(prevState.potential.clone(), -1, 1) || Vec2.create()

    if (!this.tileMap.hasTagAt(prevState.position.clone().add(direction), 'collides')) {
      prevState.position.add(direction)
    }

    return prevState
  }
}