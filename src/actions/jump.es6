import { pickBy } from 'lodash'
import { Action } from '../action'
import { TileMap } from '../tile_map'
import { Actor } from '../actor'

export class Jump extends Action {
  constructor(tileMap, actor) {
    super(tileMap, actor)
    this.color = '#3498db'
  }

  get tiles() {
    return pickBy(TileMap.directions, (t, k) => {
      return k == 'down' && this.tileMap.hasTagAt(t.add(this.actor.position), 'collides')
    })
  }
}
