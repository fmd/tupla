import { AI } from './ai'
import { reduce, filter } from 'lodash'

export class PlayerAI extends AI {
  constructor(tileMap, actor) {
    super(tileMap, actor)
  }

  get currentState() {
    return this.actor.actionState.current
  }

  get availableMoves() {
    return reduce(this.actor.directions,(moves, point, direction) => {
      if (!this.hasTagAt(direction, 'collides')) moves[direction] = point
      return moves
    }, {})
  }

  beforeUpdate(nextTurn) {
    super.beforeUpdate(nextTurn)

    const gravity = 1.0
    const friction = 1.0
    const maxAcceleration = 1.0
    const maxVelocity = 1.0
    const acceleration = this.clampPoint(this._applyFriction(this._applyGravity(this.currentState.acceleration, gravity), friction), 0, maxAcceleration)
    const velocity = this.clampPoint(this.addPoints(this.currentState.velocity, acceleration), 0, maxVelocity)
    const point = this._reduceToAvailable(this.addPoints(this.currentState.point, velocity))
    this.actor.actionState.updateState(nextTurn, { point, velocity, acceleration })
  }

  afterUpdate(currentTurn) {
    super.afterUpdate(currentTurn)
  }

  _reduceToAvailable(point) {
    let moves = filter(this.availableMoves, (p) => point.x == p.x && point.y == p.y)
    if (moves.length == 0) moves = [this.currentState.point]
    return moves[0]
  }

  _applyGravity(acceleration, gravity) {
    const x = acceleration.x
    const y = gravity
    return new PIXI.Point(x, y)
  }

  _applyFriction(acceleration, friction) {
    const x = this.hasTagAt('down', 'collides') * acceleration.x - friction
    const y = acceleration.y
    return new PIXI.Point(x, y)
  }
}
