import { AI } from './ai'
import { Move } from '../actions/move'
import { Jump } from '../actions/jump'

export class PlayerAI extends AI {
  constructor(tileMap, actor) {
    super(tileMap, actor)
    this.actions = [new Move(tileMap, actor),
                    new Jump(tileMap, actor)]
  }

  selectDirection(tilePosition) {
    super.selectDirection(tilePosition)
  }

  beforeUpdate(nextTurn) {
    super.beforeUpdate(nextTurn)
  }

  afterUpdate(currentTurn) {
    super.afterUpdate(currentTurn)
  }
}
