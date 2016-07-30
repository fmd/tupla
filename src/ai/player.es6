import { AI } from './ai'
import { reduce, filter, concat } from 'lodash'

export class PlayerAI extends AI {
  constructor(tileMap, actor) {
    super(tileMap, actor)
    this.injectedVelocity = new PIXI.Point(0, 0)
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

  injectVelocity(velocity) {
    this.injectedVelocity = velocity
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
    const acceleration = this.clampPoint(this._applyGravity(this.currentState.acceleration, gravity), -maxAcceleration, maxAcceleration)
    const velocity = this.clampPoint(this._groundVelocity(this.addPoints(this.currentState.velocity, acceleration)), -maxVelocity, maxVelocity)
    const clampedVelocity = this.clampPoint(this.addPoints(velocity, this.injectedVelocity), -maxVelocity, maxVelocity)
    const position = this._reduceToAvailable(this.addPoints(this.position, clampedVelocity))
    this.injectedVelocity = new PIXI.Point(0, 0)
    return { position, velocity, acceleration }
  }

  _groundVelocity(velocity) {
    return new PIXI.Point(velocity.x, velocity.y * !this.hasTagAt('down', 'collides'))
  }

  _reduceToAvailable(point) {
    console.log(point, this.availableMoves)
    return concat(filter(this.availableMoves, (p) => point.x == p.x && point.y == p.y), this.position)[0]
  }

  _applyGravity(acceleration, gravity) {
    const x = acceleration.x
    const y = gravity
    return new PIXI.Point(x, y)
  }
}
