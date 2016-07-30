import PIXI from 'pixi.js'
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
             up:     new PIXI.Point(p.x, p.y - 1),
             down:   new PIXI.Point(p.x, p.y + 1),
             left:   new PIXI.Point(p.x - 1, p.y),
             right:  new PIXI.Point(p.x + 1, p.y) }
  }

  hasTagAt(direction, tag) {
    return this.tileMap.hasTagAt(this.directions[direction], tag)
  }

  tagsAt(direction) {
    return this.tileMap.allTagsAt(this.directions[direction])
  }

  clampPoint(point, min, max) {
    return new PIXI.Point(clamp(point.x, min, max), clamp(point.y, min, max))
  }

  addPoints(a, b) {
    return new PIXI.Point(a.x + b.x, a.y + b.y)
  }
}
