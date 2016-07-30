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

  hasTagAt(direction, tag) {
    return this.tileMap.hasTagAt(this.actor.directions[direction], tag)
  }

  tagsAt(direction) {
    return this.tileMap.allTagsAt(this.actor.directions[direction])
  }

  clampPoint(point, min, max) {
    return new PIXI.Point(clamp(point.x, min, max), clamp(point.y, min, max))
  }

  addPoints(a, b) {
    return new PIXI.Point(a.x + b.x, a.y + b.y)
  }
}
