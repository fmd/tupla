import { AI } from './ai'

export class PlayerAI extends AI {
  constructor(tileMap, actor) {
    super(tileMap, actor)
    this.direction = 'right'
  }

  beforeUpdate(nextTurn) {
    super.beforeUpdate(nextTurn)
    // this.actor.actionState.updateState(nextTurn, { point: this.actor.direction[this.direction] })
  }

  afterUpdate(currentTurn) {
    super.afterUpdate(currentTurn)
  }
}
