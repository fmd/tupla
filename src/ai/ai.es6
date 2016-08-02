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
    const actionMutations = map(this.actions, (a) => a.stateMutations)
    const stateMutations = reduce(actionMutations, (result, mutation) => {
      result.position.add(mutation.position || Vec2.create())
      result.potential.add(mutation.potential || Vec2.create())
      result.speed += (mutation.speed || 0)
      return result
    }, { position: Vec2.create(), potential: Vec2.create(), speed: 0 })

    const newState = { position: prevState.position.clone().add(stateMutations.position),
                       potential: prevState.potential.clone().add(stateMutations.potential),
                       speed: prevState.speed + stateMutations.speed }

    return newState
  }

  select(tile) {
    map(this.actions, (a) => a.select(tile))
  }

  beforeUpdate(nextTurn) {
    map(this.actions, (a) => a.beforeUpdate())
  }

  afterUpdate(currentTurn) {
    map(this.actions, (a) => a.afterUpdate())
  }
}
