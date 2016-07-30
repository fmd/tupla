import { AI } from './ai'
import { Vec2 } from '../vec2'
import { reduce, filter, concat, values } from 'lodash'

export class PlayerAI extends AI {
  constructor(tileMap, actor) {
    super(tileMap, actor)
    this.injectedPosition = Vec2.create()
    this.injectedVelocity = Vec2.create()
  }

  get currentState() {
    return this.actor.actionState.current
  }

  get availableMoves() {
    return reduce(this.directions, (moves, point, direction) => {
      const collides = this.hasTagAt(direction, 'collides')
      const directionPosition = this.directions[direction].clone().subtract(this.actor.position)
      const velocityPosition = Vec2.clamp(this.actor.velocity.clone(), -1.0, 1.0)
      if (!collides && directionPosition.y == velocityPosition.y) moves[direction] = point
      return moves
    }, {})
  }

  get availableJumps() {
    const down = this.directions.down
    if (this.hasTagAt('down', 'collides')) return { down }
    return {}
  }

  injectPosition(position) {
    this.injectedPosition = position
  }

  injectVelocity(velocity) {
    this.injectedVelocity = velocity.clone()
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
    const velocity = this._ceilingVelocity(this._groundVelocity(this._calculateVelocity(acceleration)).add(this.injectedVelocity))

    const maxPositionChange = 1.0
    const position = this._injectedPosition() ||
                     this._defaultPosition(Vec2.clamp(velocity.clone(), -maxPositionChange, maxPositionChange)) ||
                     this.actor.position.clone()

    this.injectedPosition = Vec2.create()
    this.injectedVelocity = Vec2.create()

    return { position, velocity, acceleration }
  }

  _calculateAcceleration() {
    const gravity = 1.0
    const maxAcceleration = 1.0
    const acceleration = this.currentState.acceleration.clone().add(Vec2.create(0, gravity))
    return Vec2.clamp(acceleration, -maxAcceleration, maxAcceleration)
  }

  _calculateVelocity(acceleration) {
    return this.currentState.velocity.clone().add(acceleration)
  }

  _injectedPosition() {
    if (this.injectedPosition.equals(Vec2.create())) return null
    const clampedPosition = this.actor.position.clone().add(Vec2.clamp(this.injectedPosition, -1.0, 1.0))
    const position = filter(concat(values(this.availableMoves), values(this.availableJumps)), (p) => {
      return p.equals(clampedPosition)
    })[0]

    return position
  }

  _defaultPosition(velocity) {
    return filter(this.availableMoves, (p) => p.equals(this.actor.position.clone().add(velocity)))[0]
  }

  _groundVelocity(velocity) {
    return Vec2.create(velocity.x, velocity.y * (!this.hasTagAt('down', 'collides') || velocity.y < 0))
  }

  _ceilingVelocity(velocity) {
    return Vec2.create(velocity.x, velocity.y * (!this.hasTagAt('up', 'collides') || velocity.y > 0))
  }

  _applyGravity(acceleration, gravity) {
    const x = acceleration.x
    const y = gravity
    return Vec2.create(x, y)
  }
}
