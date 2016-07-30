import { AI } from './ai'
import { reduce, filter, concat } from 'lodash'

export class PlayerAI extends AI {
  constructor(tileMap, actor) {
    super(tileMap, actor)
  }

  get currentState() {
    return this.actor.actionState.current
  }

  get availableMoves() {
    return reduce(this.directions,(moves, point, direction) => {
      if (!this.hasTagAt(direction, 'collides')) moves[direction] = point
      return moves
    }, {})
  }

  beforeUpdate(nextTurn) {
    super.beforeUpdate(nextTurn)
    this.actor.actionState.updateState(nextTurn, this._determineState())
  }

  afterUpdate(currentTurn) {
    super.afterUpdate(currentTurn)
  }

  _determineState() {
    const gravity = 1.0
    const friction = 1.0
    const maxAcceleration = 1.0
    const maxVelocity = 1.0
    const acceleration = this.clampPoint(this._applyFriction(this._applyGravity(this.currentState.acceleration, gravity), friction), 0, maxAcceleration)
    const velocity = this.clampPoint(this.addPoints(this.currentState.velocity, acceleration), 0, maxVelocity)
    const position = this._reduceToAvailable(this.addPoints(this.position, velocity))
    return { position, velocity, acceleration }
  }

  _reduceToAvailable(point) {
    return concat(filter(this.availableMoves, (p) => point.x == p.x && point.y == p.y), this.position)[0]
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
