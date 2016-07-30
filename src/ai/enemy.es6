import { AI } from './ai'

export class EnemyAI extends AI {
  constructor(tileMap, actor) {
    super(tileMap, actor)
    this.direction = 'right'
  }

  beforeUpdate(nextTurn) {
    super.beforeUpdate(nextTurn)
  }

  afterUpdate(currentTurn) {
    super.afterUpdate(currentTurn)
  }
}
