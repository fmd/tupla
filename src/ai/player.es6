import { AI } from './ai'
import { Vec2 } from '../vec2'
import { reduce, filter, concat } from 'lodash'

export class PlayerAI extends AI {
  constructor(tileMap, actor) {
    super(tileMap, actor)
    this.injectedVelocity = Vec2.create()
  }

  get currentState() {
    return this.actor.actionState.current
  }

  get availableMoves() {
    const b = reduce(this.directions, (moves, point, direction) => {
      if (!this.hasTagAt(direction, 'collides')) moves[direction] = point
      return moves
    }, {})
    return b
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
    const acceleration = this._calculateAcceleration()
    const velocity = this._calculateVelocity(acceleration)

    const position = this._injectedPosition() ||
                     this._defaultPosition(velocity) ||
                     this.actor.position.clone()

    this.injectedVelocity = Vec2.create()
    return { position, velocity, acceleration }
  }

  _calculateAcceleration() {
    const gravity = 1.0
    const maxAcceleration = 1.0
    const acceleration = this.currentState.acceleration
      .clone()
      .add(Vec2.create(0, gravity))

    return Vec2.clamp(acceleration, -maxAcceleration, maxAcceleration)
  }

  _calculateVelocity(acceleration) {
    const maxVelocity = 1.0
    const velocity = this.currentState.velocity
      .clone()
      .add(acceleration)

    return Vec2.clamp(velocity, -maxVelocity, maxVelocity)
  }

  _injectedPosition() {
    if (this.injectedVelocity.equals(Vec2.create())) return null
    const position = filter(this.availableMoves, (p) => p.equals(this.actor.position.clone().add(this.injectedVelocity)))[0]
    return position
  }

  _defaultPosition(velocity) {
    return filter(this.availableMoves, (p) => p.equals(this.actor.position.clone().add(velocity)))[0]
  }

  _groundVelocity(velocity) {
    return Vec2.create(velocity.x, velocity.y * !this.hasTagAt('down', 'collides'))
  }

  _applyGravity(acceleration, gravity) {
    const x = acceleration.x
    const y = gravity
    return Vec2.create(x, y)
  }
}
