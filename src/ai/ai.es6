import PIXI from 'pixi.js'
import { Vec2 } from '../vec2'
import { TileMap } from '../tile_map'
import { keys, values, pick, pickBy } from 'lodash'

export class AI {
  constructor(tileMap, actor) {
    this.tileMap = tileMap
    this.actor = actor
  }

  determineState(prevState) {
    const addPosition = values(this.selectedDirection)[0] || Vec2.create()
    
    const newState = { position: prevState.position.clone().add(addPosition),
                       potential: prevState.potential.clone(),
                       speed: prevState.speed }

    return newState
  }

  get availableTiles() {
    return pickBy(TileMap.directions, (d) => this.tileMap.isGrounded(d.add(this.actor.position)))
  }

  get availableDirections() {
    return pick(TileMap.directions, keys(this.availableTiles))
  }

  selectDirection(tile) {
    this._selectedDirection = pick(this.availableDirections, keys(pickBy(this.availableTiles, (d) => d.equals(tile))))
  }

  get selectedDirection() {
    return this._selectedDirection
  }

  beforeUpdate(nextTurn) {

  }

  afterUpdate(currentTurn) {
    this._selectedDirection = null
  }

  hasTagAt(direction, tag) {
    return this.tileMap.hasTagAt(this.directions[direction], tag)
  }

  tagsAt(direction) {
    return this.tileMap.allTagsAt(this.directions[direction])
  }
}
