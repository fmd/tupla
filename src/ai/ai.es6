import PIXI from 'pixi.js'
import { keys, values, pick, pickBy, map, reduce } from 'lodash'
import { Vec2 } from '../vec2'
import { TileMap } from '../tile_map'
import { Move } from '../actions/move'

export class AI {
  constructor(tileMap, actor) {
    this.tileMap = tileMap
    this.actor = actor
    this.actions = [new Move(tileMap, actor)]
  }

  determineState(prevState) {
    const newState = this.actionStateChain(prevState, 0)
    return newState
  }

  actionStateChain(prevState, index) {
    const action = this.actions[index]
    if (action) {
      prevState = action.beforeState(prevState)
      prevState = this.actionStateChain(prevState, index + 1)
      prevState = action.afterState(prevState)
    }
    return prevState
  }

  select(tile) {
    map(this.actions, (a) => a.select(tile))
  }

  update() {
    map(this.actions, (a) => a.update())
  }
}
