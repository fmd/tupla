import { pickBy, values, merge } from 'lodash'
import { Vec2 } from '../vec2'
import { Action } from '../action'
import { TileMap } from '../tile_map'
import { Actor } from '../actor'

export class Move extends Action {
  constructor(tileMap, actor, next) {
    super(tileMap, actor, next)
    this.color = '#cccccc'
  }

  get tiles() {
    let tiles = {}
    const position = this.actor.state.position.clone()
    const potential = Vec2.clamp(this.actor.state.potential.clone(), -1, 1)
    const potentials = pickBy(TileMap.directions, (d) => d.y == potential.y)
    tiles = merge(tiles, pickBy(potentials, (v) => !this.tileMap.hasTagAt(v.add(position), 'collides')))

    if (potential.y == 0) {
      const climbables = pickBy(TileMap.directions, (d) => d.x != 0 && d.y != 0)
      tiles = merge(tiles, pickBy(climbables, (v) => this.tileMap.isGrounded(v.add(position))))
    }

    return tiles
  }

  beforeState(prevState) {
    const direction = values(this._selected)[0] || Vec2.clamp(prevState.potential.clone(), -1, 1) || Vec2.create()
    if (!this.tileMap.hasTagAt(prevState.position.clone().add(direction), 'collides')) {
      prevState.position.add(direction)
    }

    return prevState
  }
}
