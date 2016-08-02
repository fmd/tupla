import { pickBy, keys } from 'lodash'
import { Action } from '../action'
import { TileMap } from '../tile_map'
import { Actor } from '../actor'

export class Jump extends Action {
  constructor(tileMap, actor, next) {
    super(tileMap, actor, next)
    this.color = '#3498db'
  }

  get tiles() {
    return pickBy(TileMap.directions, (t, k) => {
      return k == 'down' && this.tileMap.hasTagAt(t.add(this.actor.position), 'collides')
    })
  }

  beforeState(prevState) {
    if (keys(this._selected).length > 0) {
      prevState.potential.y = -4
    }

    return prevState
  }

  afterState(prevState) {
    if (prevState.potential.y < 0 && this.tileMap.isCeilinged(this.actor.position)) {
      prevState.potential.y = 0
    }

    return prevState
  }
}
