import PIXI from 'pixi.js'
import { Vec2 } from '../vec2'
import { clamp } from 'lodash'

export class AI {
  constructor(tileMap, actor) {
    this.tileMap = tileMap
    this.actor = actor
  }

  beforeUpdate(nextTurn) {

  }

  afterUpdate(currentTurn) {

  }

  get state() {
    return this.actor.state
  }

  get position() {
    return this.state.position
  }

  get directions() {
    const p = this.position
    return { center: p,
             up:     Vec2.create(p.x, p.y - 1),
             down:   Vec2.create(p.x, p.y + 1),
             left:   Vec2.create(p.x - 1, p.y),
             right:  Vec2.create(p.x + 1, p.y) }
  }

  hasTagAt(direction, tag) {
    return this.tileMap.hasTagAt(this.directions[direction], tag)
  }

  tagsAt(direction) {
    return this.tileMap.allTagsAt(this.directions[direction])
  }
}
