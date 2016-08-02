import { AI } from './ai'
import { Fall } from '../actions/fall'
import { Jump } from '../actions/jump'
import { Move } from '../actions/move'

export class PlayerAI extends AI {
  constructor(tileMap, actor) {
    super(tileMap, actor)
    this.actions = [new Fall(tileMap, actor),
                    new Jump(tileMap, actor),
                    new Move(tileMap, actor)]
  }
}
