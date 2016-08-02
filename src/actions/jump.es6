import { pickBy, keys } from 'lodash'
import { Action } from '../action'
import { TileMap } from '../tile_map'
import { Actor } from '../actor'

export class Jump extends Action {
  constructor(tileMap, actor) {
    super(tileMap, actor)
    this.color = '#3498db'
    this.power = 3
  }

  get tiles() {
    if (this.tileMap.isCeilinged(this.actor.position)) return {}
    return pickBy(TileMap.directions, (t, k) => {
      return k == 'down' && this.tileMap.hasTagAt(t.add(this.actor.position), 'collides')
    })
  }

  afterState(prevState) {
    const ceilinged = this.tileMap.isCeilinged(this.actor.position)
    if (keys(this._selected).length > 0) {
      prevState.potential.y = -this.power
    } else if (prevState.potential.y < 0 && ceilinged) {
      prevState.potential.y = 0
    }

    return prevState
  }
}
