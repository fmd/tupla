import { TileMap } from './tile_map'
import { pick, keys, pickBy } from 'lodash'

export class Action {
  constructor(tileMap, actor) {
    this.tileMap = tileMap
    this.actor = actor
    this.color = '#232323'
    this.selectedColor = '#ffffff'
  }

  get tiles() {
    return {}
  }

  get directions() {
    return pick(TileMap.directions, keys(this.tiles))
  }

  get stateMutations() {
    return {}
  }

  beforeUpdate() {

  }

  afterUpdate() {
    this.render()
  }

  select(tile) {
    this._selected = pick(this.directions, keys(pickBy(this.tiles, (d) => d.equals(tile))))
    this.actor.guideRenderer.render(this._selected, this.selectedColor)
  }

  render() {
    this.actor.guideRenderer.render(this.directions, this.color)
    this._selected = null
  }
}
