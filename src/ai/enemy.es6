import { AI } from './ai'
import { Fall } from '../actions/fall'
import { Move } from '../actions/move'
import { TileMap } from '../tile_map'

export class EnemyAI extends AI {
  constructor(tileMap, actor) {
    super(tileMap, actor)
    this.direction = 'right'
    this.actions = [new Fall(tileMap, actor),
                    new Move(tileMap, actor)]
  }

  update() {
    super.update()
    const right = this.tileMap.isGrounded(this.actor.position.clone().add(TileMap.directions.right))
    const left = this.tileMap.isGrounded(this.actor.position.clone().add(TileMap.directions.left))

    if (this.direction == 'right' && !right) {
      this.direction = 'left'
    } else if (this.direction == 'left' && !left) {
      this.direction = 'right'
    }

    this.select(this.actor.position.clone().add(TileMap.directions[this.direction]))
  }
}
